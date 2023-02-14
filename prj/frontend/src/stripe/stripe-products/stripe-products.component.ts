import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../backend/services/backend.service';
import { IUserInventory } from '../../users/models/user-inventory.interface';
import { IProduct } from '../models/product.interface';

@Component({
  selector: 'app-stripe-products',
  templateUrl: './stripe-products.component.html',
  styleUrls: ['./stripe-products.component.css']
})
export class StripeProductsComponent implements OnInit {
  public products: IProduct[] = []

  public isLoading: boolean = true;

  private inventory: IUserInventory;

  constructor(private readonly backendService: BackendService) {

  }
  
  public ngOnInit(): void {
    const user = this.backendService.getUser();

    Promise.all([
      this.backendService.getProducts(),
      this.backendService.getUserInventory(user.externalId),
    ])
      .then((x: [IProduct[], IUserInventory]) => {
        this.products = x[0];
        this.inventory = x[1];
      })
      .finally(() => {
        this.isLoading = false;
      })
  }

  public isBought(item: IProduct): boolean {
    return this.inventory.skins.includes(item.externalId);
  }
}
