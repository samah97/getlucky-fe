import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmAccountComponent } from './confirm-account/confirm-account.component';
import {AccountRoutingModule} from "./account-routing.module";



@NgModule({
  declarations: [
    ConfirmAccountComponent
  ],
  imports: [
    CommonModule,
      AccountRoutingModule
  ]
})
export class AccountModule { }
