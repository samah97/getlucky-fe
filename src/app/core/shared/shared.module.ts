import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogComponent} from "./dialog/dialog.component";
import {DialogModule} from "primeng/dialog";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {ButtonModule} from "primeng/button";
import {ToastModule} from "primeng/toast";
import {AutoFocusModule} from "primeng/autofocus";
import {BreadcrumbComponent} from "./breadcrumb/breadcrumb.component";
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    DialogComponent,
    BreadcrumbComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    ToastModule,
    AutoFocusModule,
    RouterLink
  ],
  exports:[
    DialogComponent,
    BreadcrumbComponent
  ]
})
export class SharedModule { }
