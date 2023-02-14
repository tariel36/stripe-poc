import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../backend/services/backend.service';
import { IProduct } from '../../stripe/models/product.interface';
import { IUserInventory } from '../models/user-inventory.interface';

@Component({
  selector: 'app-user-inventory',
  templateUrl: './user-inventory.component.html',
  styleUrls: ['./user-inventory.component.scss']
})
export class UserInventoryComponent implements OnInit {
  public isLoading = true;

  public products: IProduct[];

  public inventory: IUserInventory;

  constructor(private readonly backendService: BackendService) {
    
  }
  
  public ngOnInit(): void {
    const user = this.backendService.getUser();

    Promise.all([
      this.backendService.getProducts(),
      this.backendService.getUserInventory(user.externalId)
    ])
    .then((value: [IProduct[], IUserInventory]) => {
      this.inventory = value[1];
      this.products = value[0].filter(x => this.inventory.skins.includes(x.externalId));
    })
    .finally(() => {
      this.isLoading = false;
    })
  }
}
