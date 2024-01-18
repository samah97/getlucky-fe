import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import {OrderRoutingModule} from "./order-routing.module";
import {OrderStatusTransformPipe} from "../core/pipes/order-status-transform.pipe";
import {SharedModule} from "../core/shared/shared.module";
import {ProductModule} from "../product/product.module";



@NgModule({
  declarations: [
    OrderComponent,
    MyOrdersComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    OrderStatusTransformPipe,
    SharedModule,
    ProductModule
  ]
})
export class OrderModule { }
