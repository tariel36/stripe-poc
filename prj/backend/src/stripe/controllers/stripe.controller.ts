import { Body, Controller, Get, Post } from '@nestjs/common';
import { StripeService } from '../services/stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Get('products')
  public async getProducts(): Promise<any> {
    return await this.stripeService.getAllProducts();
  }

  @Post('customerPortal')
  public async getCustomerPortal(
    @Body() args: { customer: string; returnUrl: string },
  ): Promise<string> {
    return await this.stripeService.getCustomerPortal(
      args.customer,
      args.returnUrl,
    );
  }
}
