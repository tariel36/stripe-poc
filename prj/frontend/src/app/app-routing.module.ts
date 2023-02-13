import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "../home/home/home.component";
import { AddStripeProductComponent } from "../stripe/add-stripe-product/add-stripe-product.component";
import { StripeProductTableComponent } from "../stripe/stripe-product-table/stripe-product-table.component";
import { StripeProductsComponent } from "../stripe/stripe-products/stripe-products.component";

export enum Paths {
  home = "home",
  addStripeProduct = "add-stripe-product",
  stripeProducts = "stripe-products",
  stripeProductTable = "stripe-product-table",
}

const routes: Routes = [
  { path: Paths.home, component: HomeComponent },
  { path: Paths.addStripeProduct, component: AddStripeProductComponent },
  { path: Paths.stripeProducts, component: StripeProductsComponent },
  { path: Paths.stripeProductTable, component: StripeProductTableComponent },
  { path: "**", component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
