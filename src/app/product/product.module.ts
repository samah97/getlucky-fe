import { NgModule } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CountdownPipe } from '../core/pipes/countdown.pipe';
import { CountdownModule } from 'ngx-countdown';
import { ProductRoutingModule } from './product-routing.module';
import {SharedModule} from "../core/shared/shared.module";
import { ProductsListComponent } from './products-list/products-list.component';
import {BreadcrumbComponent} from "../core/shared/breadcrumb/breadcrumb.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ProductComponent,
    ProductDetailsComponent,
    ProductsListComponent
  ],
    imports: [
        CommonModule,
        NgIf,
        CountdownPipe,
        ProductRoutingModule,
        CommonModule,
        CountdownModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
    ],
  exports: [
    ProductComponent,
    ProductsListComponent
  ]
})
export class ProductModule { }
