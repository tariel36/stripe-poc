import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StripeProductTableComponent } from './stripe-product-table/stripe-product-table.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    StripeProductTableComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [StripeProductsComponent]
})
export class StripeModule { }
