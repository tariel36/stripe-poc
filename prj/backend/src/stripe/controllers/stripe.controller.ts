import { Body, Controller, Get, Post } from '@nestjs/common';
import { IProduct } from '../models/product.interface';
import { StripeService } from '../services/stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Get('products')
  public async getProducts(): Promise<IProduct[]> {
    return await this.stripeService.getAllProducts();
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
