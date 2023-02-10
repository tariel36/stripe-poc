import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../backend/services/backend.service';
import { IProduct } from '../models/product.interface';

@Component({
  selector: 'app-stripe-products',
  templateUrl: './stripe-products.component.html',
  styleUrls: ['./stripe-products.component.css']
})
export class StripeProductsComponent implements OnInit {
  public products: IProduct[] = []

  constructor(private readonly backendService: BackendService) {

  }
  
  public ngOnInit(): void {
    this.backendService.getProducts()
      .then(x => {
        console.log(x);
        this.products = x;
      });
  }
}
