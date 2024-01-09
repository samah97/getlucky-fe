import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationSuccessComponent } from './registration-success/registration-success.component';
import {OrderPaidComponent} from "./order-paid/order-paid.component";
import {OrderFailedComponent} from "./order-failed/order-failed.component";
import {AboutUsComponent} from "./about-us/about-us.component";

const routes: Routes = [
  { path: "registration-success", component:RegistrationSuccessComponent},
  { path: "order-success", component:OrderPaidComponent},
  { path: "order-failed", component:OrderFailedComponent},
  { path: "about-us", component:AboutUsComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {



}
