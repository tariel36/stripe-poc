import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { first } from '../../utility/functions';
import { ICustomer } from '../models/customer.interface';
import { IProduct } from '../models/product.interface';

@Injectable()
export class StripeService {
  private readonly client: Stripe;

  constructor() {
    const secret = process.env.STRIPE_API_SECRET;

    this.client = new Stripe(secret, {
      apiVersion: '2022-11-15',
    });
  }

  public async getAllProducts(): Promise<IProduct[]> {
    return (await this.client.products.list()).data.map((x) => {
      return {
        id: x.id,
        description: x.description,
        image: x.images?.find(first),
        name: x.name,
        priceId:
          (x.default_price as Stripe.Price).id ?? (x.default_price as string),
      };
    });
  }

  public async createCustomer(customer: ICustomer): Promise<ICustomer> {
    const stripeCustomer = await this.client.customers.create({
      email: customer.email,
      metadata: {
        id: customer.externalId,
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
    });

    return session.url;
  }
}
