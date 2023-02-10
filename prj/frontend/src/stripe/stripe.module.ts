import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StripeProductsComponent } from './stripe-products/stripe-products.component';
import { StripeProductTableComponent } from './stripe-product-table/stripe-product-table.component';
import { StripeProductItemComponent } from './stripe-product-item/stripe-product-item.component';
import { BackendModule } from '../backend/backend.module';
import { MaterialModule } from '../material/material.module';

const components = [
  StripeProductTableComponent,
  StripeProductsComponent,
  StripeProductItemComponent
];

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
    BackendModule,
    MaterialModule
  ],
  exports: [...components]
})
export class StripeModule { }
