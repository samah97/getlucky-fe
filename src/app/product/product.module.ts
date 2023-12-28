import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CountdownPipe } from '../core/pipes/countdown.pipe';
import { CountdownModule } from 'ngx-countdown';
import { ProductRoutingModule } from './product-routing.module';



@NgModule({
  declarations: [
    ProductComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    NgIf,
    CountdownPipe,
    ProductRoutingModule,
    CommonModule,
    CountdownModule
  ],
  exports:[
    ProductComponent
  ]
})
export class ProductModule { }
