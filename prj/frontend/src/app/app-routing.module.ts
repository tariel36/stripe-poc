import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home/home.component';
import { StripeProductTableComponent } from '../stripe/stripe-product-table/stripe-product-table.component';
import { StripeProductsComponent } from '../stripe/stripe-products/stripe-products.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'stripe-products', component: StripeProductsComponent },
    { path: 'stripe-product-table', component: StripeProductTableComponent },
    { path: '**', component: HomeComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }