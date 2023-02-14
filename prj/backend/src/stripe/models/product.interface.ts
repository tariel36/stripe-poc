export interface IProduct {
  id: string;
  externalId: string;
  description: string;
  image: string;
  name: string;
  priceId: string;
  prices: {
    currency: string;
    value: string;
  }[];
}
