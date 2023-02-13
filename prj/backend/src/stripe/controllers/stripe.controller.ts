import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ICreateProductArgs } from '../models/create-product-args.interface';
import { ICustomer } from '../models/customer.interface';
import { IProduct } from '../models/product.interface';
import { StripeService } from '../services/stripe.service';
import { Request, Response } from 'express';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Get('products')
  public async getProducts(): Promise<IProduct[]> {
    return await this.stripeService.getAllProducts();
  }

  @Get('customers')
  public async getCustomers(): Promise<ICustomer[]> {
    return await this.stripeService.getAllCustomers();
  }

  @Post('product/create')
  public async postProductCreate(
    @Body() args: ICreateProductArgs,
  ): Promise<IProduct> {
    return await this.stripeService.createProduct(args);
  }

  @Post('customer/create')
  public async postCustomerCreate(@Body() args: ICustomer): Promise<ICustomer> {
    return await this.stripeService.createCustomer(args);
  }

  @Post('customerPortal')
  public async postCustomerPortal(
    @Body() args: { customer: string; returnUrl: string },
  ): Promise<string> {
    return await this.stripeService.getCustomerPortal(
      args.customer,
      args.returnUrl,
    );
  }

  @Post('checkout')
  public async postCheckout(
    @Body() args: { customer: string; returnUrl: string; priceId: string },
  ): Promise<string> {
    return await this.stripeService.getCheckoutUrl(
      args.customer,
      args.returnUrl,
      args.priceId,
    );
  }

  @Post('webhook')
  public async postWebhook(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    await this.stripeService.handleWebHookEvent(req, res);
  }
}
