import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MyOrdersComponent} from "./my-orders/my-orders.component";
import {CartComponent} from "./cart/cart.component";

const routes: Routes = [
  { path: "my-orders", component: MyOrdersComponent},
  { path: "cart", component: CartComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {



}
