import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StripeProductTableComponent } from './stripe-product-table/stripe-product-table.component';
const components = [
  StripeProductTableComponent
];

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    ...components
  ],
  imports: [
    CommonModule
  ],
  exports: [...components]
})
export class StripeModule { }
