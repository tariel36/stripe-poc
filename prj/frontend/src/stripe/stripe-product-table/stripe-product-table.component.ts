import { AfterContentInit, Component, OnInit } from '@angular/core';
import { LocalStorageKey } from '../../local-storage/models/local-storage-key';
import { ICustomer } from '../models/customer.interface';

@Component({
  selector: 'app-stripe-product-table',
  templateUrl: './stripe-product-table.component.html',
  styleUrls: ['./stripe-product-table.component.scss']
})
export class StripeProductTableComponent implements OnInit, AfterContentInit {
  public isLoading = true;

  public customerEmail = '';

  constructor() {

  }

  public ngOnInit(): void {
    this.customerEmail = (JSON.parse(localStorage.getItem(LocalStorageKey.Customer)) as ICustomer).email;
    console.log('ngOnInit')
  }

  public ngAfterContentInit(): void {
    this.isLoading = false;
    console.log('ngAfterContentInit')
  }
}
