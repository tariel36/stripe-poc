import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../backend/services/backend.service';
import { ICustomer } from '../models/customer.interface';
import { FormControl, Validators } from '@angular/forms';
import { GeneralErrorStateMatcher } from '../../forms/general-error-state-matcher';
import { LocalStorageKey } from '../../local-storage/models/local-storage-key';
import { Router } from '@angular/router';
import { Paths } from '../../app/app-routing.module';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-stripe-customer-list',
  templateUrl: './stripe-customer-list.component.html',
  styleUrls: ['./stripe-customer-list.component.scss']
})
export class StripeCustomerListComponent implements OnInit {
  public emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  public matcher = new GeneralErrorStateMatcher();

  public customers: ICustomer[] = []

  public isLoading = true;

  constructor(
    private readonly backendService: BackendService,
    private readonly router: Router
    ) {

  }

  public ngOnInit(): void {
    this.backendService.getCustomers()
      .then(x => {
        this.customers = x;
        this.isLoading = false;
      });
  }

  public onCustomerClick(item: ICustomer): void {
    this.login(item);
  }

  public onLoginClick(): void {
    this.isLoading = true;

    this.backendService.createCustomer({
      email: this.emailFormControl.value,
      externalId: uuidv4(),
      name: '',
      stripeId: ''
    })
      .then(x => {
        this.login(x);
      })
  }

  private login(customer: ICustomer): void {
    localStorage.setItem(LocalStorageKey.Customer, JSON.stringify(customer));
    this.router.navigate([Paths.stripeProducts]);
  }
}

