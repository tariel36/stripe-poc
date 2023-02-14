import { AfterContentInit, Component, OnInit } from '@angular/core';
import { BackendService } from '../../backend/services/backend.service';
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

  constructor(private readonly backendService: BackendService) {

  }

  public ngOnInit(): void {
    this.customerEmail = this.backendService.getUser().email;
    console.log('ngOnInit')
  }

  public ngAfterContentInit(): void {
    this.isLoading = false;
    console.log('ngAfterContentInit')
  }
}
