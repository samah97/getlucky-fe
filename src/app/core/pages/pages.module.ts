import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationSuccessComponent } from './registration-success/registration-success.component';
import { PagesRoutingModule } from './pages-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OrderPaidComponent } from './order-paid/order-paid.component';
import {SharedModule} from "../shared/shared.module";
import { OrderFailedComponent } from './order-failed/order-failed.component';
import { AboutUsComponent } from './about-us/about-us.component';



@NgModule({
  declarations: [
    RegistrationSuccessComponent,
    PageNotFoundComponent,
    OrderPaidComponent,
    OrderFailedComponent,
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
