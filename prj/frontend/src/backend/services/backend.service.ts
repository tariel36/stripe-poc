import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable()
export class BackendService {
  private readonly url = `${environment.baseApiUrl}/stripe`;

  constructor(private readonly httpClient: HttpClient) {}

  public async getProducts(): Promise<any> {
    return await this.httpClient.get(`${this.url}/products`).toPromise();
  }

  public async getCustomerPortal(): Promise<string> {
    return await this.httpClient
      .post(
        `${this.url}/customerPortal`,
        {
          customer: environment.customerId,
          return_url: environment.currentUrl,
        },
        { responseType: "text" }
      )
      .toPromise();
  }
}
