import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MyOrdersComponent} from "./my-orders/my-orders.component";

const routes: Routes = [
  { path: "my-orders", component: MyOrdersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {



}
