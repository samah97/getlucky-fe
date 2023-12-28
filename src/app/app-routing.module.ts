import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductModule } from '../app/product/product.module';
import { HomeModule } from '../app/home/home.module';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product/product-details/product-details.component';

const routes: Routes = [
  {
    path:'', 
    loadChildren: ()=>import("./home/home.module").then(m=> m.HomeModule)
  },
  {
    path:'products', 
    loadChildren: ()=>import("./product/product.module").then(m=> m.ProductModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


  
 }
