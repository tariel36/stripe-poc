import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
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
        images: x.images,
        name: x.name,
      };
    });
  }
}
