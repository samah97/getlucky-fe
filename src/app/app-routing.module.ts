import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from "./core/pages/page-not-found/page-not-found.component";
import {AuthGuard} from "./auth-guard";


const routes: Routes = [
  {
    path:'',
    loadChildren: ()=>import("./home/home.module").then(m=> m.HomeModule)
  },
  {
    path:'profile',
    loadChildren: ()=>import("./profile/profile.module").then(m=> m.ProfileModule),
    canActivate:[AuthGuard]
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
  {
    path:'**',
    component:PageNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
