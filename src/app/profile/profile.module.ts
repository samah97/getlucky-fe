import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import {ProfileRoutingModule} from "./profile-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ChangePasswordComponent } from './change-password/change-password.component';



@NgModule({
  declarations: [
    ProfileComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProfileModule { }
