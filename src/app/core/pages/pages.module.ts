import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationSuccessComponent } from './registration-success/registration-success.component';
import { PagesRoutingModule } from './pages-routing.module';



@NgModule({
  declarations: [
    RegistrationSuccessComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
