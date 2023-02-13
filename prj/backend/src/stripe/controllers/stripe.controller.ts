import { Body, Controller, Get, Post } from '@nestjs/common';
import { ICustomer } from '../models/customer.interface';
import { IProduct } from '../models/product.interface';
import { StripeService } from '../services/stripe.service';

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
}
