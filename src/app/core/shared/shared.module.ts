import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from "./dialog/dialog.component";
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import { ToastModule } from "primeng/toast";
import { AutoFocusModule } from "primeng/autofocus";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { RouterLink } from "@angular/router";
import {AvatarModule} from "primeng/avatar";
import { NumberInputComponent } from './number-input/number-input.component';
import {InputNumberModule} from "primeng/inputnumber";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    DialogComponent,
    BreadcrumbComponent,
    NumberInputComponent,
  ],
    imports: [
        CommonModule,
        DialogModule,
        ButtonModule,
        ToastModule,
        AutoFocusModule,
        RouterLink,
        AvatarModule,
        InputNumberModule,
        FormsModule
    ],
    exports: [
        DialogComponent,
        BreadcrumbComponent,
        NumberInputComponent
    ]
})
export class SharedModule { }
