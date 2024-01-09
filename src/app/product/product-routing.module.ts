import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AuthGuard } from '../auth-guard';
import {ProductsListComponent} from "./products-list/products-list.component";

const routes: Routes = [
  { path: "list",
    component: ProductsListComponent,
    canActivate:[AuthGuard]
  }
  ,{ path: "details/:id",
    component: ProductDetailsComponent,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {
}
