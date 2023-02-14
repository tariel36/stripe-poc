import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { first } from '../../utility/functions';
import { ICreateProductArgs } from '../models/create-product-args.interface';
import { ICustomer } from '../models/customer.interface';
import { IProduct } from '../models/product.interface';
import { readFileSync } from 'fs';
import {
  StripeEventHandler,
  IOnEventContext,
} from '../models/stripe-event-handler';
import { Request, Response } from 'express';
import { UserService } from '../../users/services/user.service';

@Injectable()
export class StripeService {
  private readonly client: Stripe;

  private readonly webHookSecret = process.env.STRIPE_API_WEBHOOK_SECRET;

  private supportedEvents = new Map<string, StripeEventHandler>(
    [
      new StripeEventHandler('invoice.paid', (x) => this.onInvoicePaid(x)),
      // new StripeEventHandler('invoice.payment_failed', (x) => this.onPaymentFailed(x)),
    ].map((handler) => [handler.type, handler]),
  );

  constructor(private readonly userService: UserService) {
    const secret = process.env.STRIPE_API_SECRET;

    this.client = new Stripe(secret, {
      apiVersion: '2022-11-15',
    });
  }

  public async handleWebHookEvent(req: Request, res: Response): Promise<void> {
    const event = await this.ensureSignedEvent(req, res);

    if (!event) {
      throw new Error('Invalid event.');
    }

    const handler = this.supportedEvents.get(event.type);

    if (!handler) {
      res.status(200).end();
      return;
    }

    await handler.delegate({ event, req, res });
  }

  public async getAllProducts(): Promise<IProduct[]> {
    return (
      await this.client.products.list({
        expand: ['data.default_price', 'data.default_price.currency_options'],
      })
    ).data.map((x) => {
      return this.toProduct(x);
    });
  }

  public async createCustomer(customer: ICustomer): Promise<ICustomer> {
    const stripeCustomer = await this.client.customers.create({
      email: customer.email,
      metadata: {
        userId: customer.externalId,
      },
    });

    return {
      email: stripeCustomer.email,
      externalId: stripeCustomer.metadata.id ?? 'n/a',
      stripeId: stripeCustomer.id,
      name: stripeCustomer.name,
    };
  }

  public async getAllCustomers(): Promise<ICustomer[]> {
    return (await this.client.customers.list()).data.map((x) => {
      return {
        email: x.email,
        externalId: x.metadata.id ?? 'n/a',
        stripeId: x.id,
        name: x.name,
      };
    });
  }

  public async getCustomerPortal(
    customer: string,
    returnUrl: string,
  ): Promise<string> {
    const session = await this.client.billingPortal.sessions.create({
      customer,
      return_url: returnUrl,
    });

    return session.url;
  }

  public async getCheckoutUrl(
    customerId: string,
    returnUrl: string,
    priceId: string,
  ): Promise<string> {
    const session = await this.client.checkout.sessions.create({
      cancel_url: returnUrl ?? '',
      success_url: returnUrl ?? '',
      mode: 'payment',
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      tax_id_collection: {
        enabled: false,
      },
      billing_address_collection: 'required',
      customer_update: {
        address: 'auto',
        shipping: 'auto',
        name: 'auto',
      },
      invoice_creation: {
        enabled: true,
      },
    });

    return session.url;
  }

  public async createProduct(args: ICreateProductArgs): Promise<IProduct> {
    const {
      name,
      description,
      height,
      length,
      weight,
      width,
      externalId,
      currency,
      value,
    } = args;

    let { image, shippable } = args;

    if (image && !image.startsWith('http')) {
      image = (await this.uploadImage(image))?.links?.data?.find(first)?.url;
    }

    if (typeof args.shippable === 'string') {
      shippable = args.shippable === 'true';
    }

    const currency_options = (args.currencies ?? []).reduce((prev, curr) => {
      const currencyValue = this.toDecimal(curr.value);

      prev[curr.currency.toLowerCase()] = {
        unit_amount_decimal: currencyValue,
      };

      return prev;
    }, {});

    const stripeObj = {
      name,
      description,
      shippable,
      package_dimensions: shippable
        ? {
            height,
            length,
            weight,
            width,
          }
        : undefined,
      metadata: {
        externalId,
      },
      images: image ? [image] : [],
      default_price_data: {
        currency,
        unit_amount_decimal: this.toDecimal(value),
        currency_options,
      },
    };

    const product = await this.client.products.create(stripeObj);

    return this.toProduct(product);
  }

  public async uploadImage(path: string): Promise<Stripe.File> {
    const img = await this.client.files.create({
      file: {
        data: readFileSync(path),
        name: path.split('\\').pop(),
        type: 'application.octet-stream',
      },
      // This is undocumented in the API but used in Stripe's dashboard's API call.
      purpose: 'product_image',
      file_link_data: {
        create: true,
      },
    });

    return img;
  }

  private getFormattedValue(currency: string, decimalValue: string): string {
    // Stripe always returns values in lowest possible unit for currencies.
    // So we need to format it to proper value, so for 0-len we get value, for 2-len we get value/100
    // and so on.
    // https://stripe.com/docs/currencies#zero-decimal

    const threeLen = ['BHD', 'JOD', 'KWD', 'OMR', 'TND'];
    const special = ['TWD', 'HUF', 'UGX'];
    const zeroLen = [
      'BIF',
      'CLP',
      'DJF',
      'GNF',
      'JPY',
      'KMF',
      'KRW',
      'MGA',
      'PYG',
      'RWF',
      'UGX',
      'VND',
      'VUV',
      'XAF',
      'XOF',
      'XPF',
    ];

    if (zeroLen.includes(currency)) {
      return decimalValue;
    }

    if (threeLen.includes(currency) || special.includes(currency)) {
      throw new Error(
        `tl;dr docs, special support needed for currency '${currency}'`,
      );
    }

    return `${+decimalValue / 100}`;
  }

  private toDecimal(value: string): string {
    return value.replace(/\.|,/gi, '');
  }

  private toProduct(stripeProduct: Stripe.Product): IProduct {
    const price = stripeProduct.default_price as Stripe.Price;

    return {
      id: stripeProduct.id,
      description: stripeProduct.description,
      image: stripeProduct.images?.find(first),
      name: stripeProduct.name,
      priceId: price.id,
      prices: Object.keys(price.currency_options ?? {}).map((y) => {
        return {
          currency: y.toUpperCase(),
          value: Intl.NumberFormat(undefined, {
            style: 'decimal',
            currency: y.toUpperCase(),
          }).format(
            +this.getFormattedValue(
              y.toUpperCase(),
              price.currency_options[y].unit_amount_decimal,
            ),
          ),
        };
      }),
    };
  }

  private getSignedEvent(
    body: any,
    signature: string | undefined,
  ): Stripe.Event | null {
    if (!this.webHookSecret) {
      return body as Stripe.Event;
    }

    return this.client.webhooks.constructEvent(
      body,
      signature,
      this.webHookSecret,
    );
  }

  private async ensureSignedEvent(
    req: Request,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    res: Response,
  ): Promise<Stripe.Event | null> {
    const sig = req.headers['stripe-signature'] as string | undefined;
    const body = req.body;

    return this.getSignedEvent(body, sig);
  }

  private async onInvoicePaid(ctx: IOnEventContext): Promise<void> {
    const invoice = ctx.event.data.object as Stripe.Invoice;

    const productIds = invoice.lines.data.map((x) => x.price.product as string);

    const products = await this.client.products.list({
      ids: productIds,
    });

    const customer = (await this.client.customers.retrieve(
      invoice.customer as string,
    )) as Stripe.Customer;

    const userId = customer.metadata.userId;

    products.data
      .map((x) => x.metadata)
      .forEach((x) => {
        if (x.externalId) {
          this.userService.addSkin(userId, x.externalId);
        } else if (x.rp) {
          this.userService.addPremiumCurrency(userId, +x.rp);
        }
      });

    ctx.res.status(200).end();
  }
}
