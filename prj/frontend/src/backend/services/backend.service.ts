import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { LocalStorageKey } from "../../local-storage/models/local-storage-key";
import { ICreateProductArgs } from "../../stripe/models/create-product-args.interface";
import { ICustomer } from "../../stripe/models/customer.interface";
import { IProduct } from "../../stripe/models/product.interface";
import { IUserInventory } from "../../users/models/user-inventory.interface";

@Injectable()
export class BackendService {
  private readonly url = `${environment.baseApiUrl}`;

  constructor(private readonly httpClient: HttpClient) {}

  public async getProducts(): Promise<IProduct[]> {
    return await this.httpClient.get<IProduct[]>(`${this.url}/stripe/products`).toPromise();
  }

  public async getCustomers(): Promise<ICustomer[]> {
    return await this.httpClient.get<ICustomer[]>(`${this.url}/stripe/customers`).toPromise();
  }

  public async createCustomer(customer: ICustomer): Promise<ICustomer> {
    return await this.httpClient
      .post<ICustomer>(`${this.url}/stripe/customer/create`, customer)
      .toPromise();
  }

  public async createProduct(product: ICreateProductArgs): Promise<IProduct> {
    return await this.httpClient
      .post<IProduct>(`${this.url}/stripe/product/create`, product)
      .toPromise();
  }

  public async getCustomerPortal(): Promise<string> {
    return await this.httpClient
      .post(
        `${this.url}/stripe/customerPortal`,
        {
          customer: this.getUser().stripeId,
          returnUrl: environment.currentUrl,
        },
        { responseType: "text" }
      )
      .toPromise();
  }

  public async getCheckout(priceId: string): Promise<string> {
    return await this.httpClient
      .post(
        `${this.url}/stripe/checkout`,
        {
          customer: this.getUser().stripeId,
          returnUrl: environment.currentUrl,
          priceId,
        },
        { responseType: "text" }
      )
      .toPromise();
  }

  public async getUserInventory(userId: string): Promise<IUserInventory> {
    return await this.httpClient
      .get<IUserInventory>(`${this.url}/user/inventory/${userId}`)
      .toPromise();
  }

  public getUser(): ICustomer {
    return JSON.parse(
      localStorage.getItem(LocalStorageKey.Customer)
    ) as ICustomer;
  }

  public setUser(customer: ICustomer): void {
    localStorage.setItem(LocalStorageKey.Customer, JSON.stringify(customer));
  }
}
