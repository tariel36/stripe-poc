import { Controller, Get } from '@nestjs/common';
import { StripeService } from '../services/stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Get('products')
  public async getProducts(): Promise<any> {
    return await this.stripeService.getAllProducts();
  }
}
