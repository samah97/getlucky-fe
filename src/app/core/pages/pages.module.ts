import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationSuccessComponent } from './registration-success/registration-success.component';
import { PagesRoutingModule } from './pages-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';



@NgModule({
  declarations: [
    RegistrationSuccessComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
