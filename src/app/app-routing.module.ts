import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'', 
    loadChildren: ()=>import("./home/home.module").then(m=> m.HomeModule)
  },
  {
    path:'products', 
    loadChildren: ()=>import("./product/product.module").then(m=> m.ProductModule)
  },
  {
    path:'auth', 
    loadChildren: ()=>import("./authentication/authentication.module").then(m=> m.AuthenticationModule)
  },
  {
    path:'pages', 
    loadChildren: ()=>import("./core/pages/pages.module").then(m=> m.PagesModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


  
 }
