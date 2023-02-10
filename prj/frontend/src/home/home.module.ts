import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { StripeModule } from '../stripe/stripe.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    StripeModule
  ],
  exports: [HomeComponent]
})
export class HomeModule { }
