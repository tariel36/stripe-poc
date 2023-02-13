export interface ICreateProductArgs {
  name: string;
  description: string;
  externalId: string;
  image: string;
  shippable: boolean;
  height?: number;
  length?: number;
  weight?: number;
  width?: number;
  currency: string;
  value: string;
  currencies: {
    currency: string;
    value: string;
  }[];
}
