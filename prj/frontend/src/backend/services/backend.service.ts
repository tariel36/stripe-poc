import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { LocalStorageKey } from "../../local-storage/models/local-storage-key";
import { ICustomer } from "../../stripe/models/customer.interface";

@Injectable()
export class BackendService {
  private readonly url = `${environment.baseApiUrl}/stripe`;

  constructor(private readonly httpClient: HttpClient) {}

  public async getProducts(): Promise<any> {
    return await this.httpClient.get(`${this.url}/products`).toPromise();
  }

  public async getCustomers(): Promise<any> {
    return await this.httpClient.get(`${this.url}/customers`).toPromise();
  }

  public async createCustomer(customer: ICustomer): Promise<any> {
    return await this.httpClient
    .post(
      `${this.url}/customer/create`,
      customer,
    )
    .toPromise();
  }

  public async getCustomerPortal(): Promise<string> {
    return await this.httpClient
      .post(
        `${this.url}/customerPortal`,
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
        `${this.url}/checkout`,
        {
          customer: this.getUser().stripeId,
          returnUrl: environment.currentUrl,
          priceId
        },
        { responseType: "text" }
      )
      .toPromise();
  }

  private getUser(): ICustomer {
    return JSON.parse(localStorage.getItem(LocalStorageKey.Customer)) as ICustomer;
  }
}
