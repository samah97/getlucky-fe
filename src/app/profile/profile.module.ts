import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import {ProfileRoutingModule} from "./profile-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AddressesComponent } from './addresses/addresses.component';
import {ToastModule} from "primeng/toast";
import {SharedModule} from "../core/shared/shared.module";



@NgModule({
  declarations: [
    ProfileComponent,
    ChangePasswordComponent,
    AddressesComponent,
  ],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ToastModule,
        SharedModule
    ]
})
export class ProfileModule { }
