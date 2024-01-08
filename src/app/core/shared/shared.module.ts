import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogComponent} from "./dialog/dialog.component";
import {DialogModule} from "primeng/dialog";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {ButtonModule} from "primeng/button";
import {ToastModule} from "primeng/toast";
import {AutoFocusModule} from "primeng/autofocus";



@NgModule({
  declarations: [
    DialogComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    ToastModule,
    AutoFocusModule,
  ],
  exports:[
    DialogComponent
  ]
})
export class SharedModule { }
