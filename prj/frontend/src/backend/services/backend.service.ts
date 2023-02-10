import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class BackendService {
    private readonly url = 'http://localhost:4300/stripe';

    constructor(private readonly httpClient: HttpClient) {

    }

    public async getProducts(): Promise<any> {
        return await this.httpClient.get(`${this.url}/products`).toPromise();
    }
}