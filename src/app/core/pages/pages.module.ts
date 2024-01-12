import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationSuccessComponent } from './registration-success/registration-success.component';
import { PagesRoutingModule } from './pages-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { OrderPaidComponent } from './order-paid/order-paid.component';
import {SharedModule} from "../shared/shared.module";
import { OrderFailedComponent } from './order-failed/order-failed.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import {ReactiveFormsModule} from "@angular/forms";
import { FaqComponent } from './faq/faq.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { ResultComponent } from './result/result.component';



@NgModule({
  declarations: [
    RegistrationSuccessComponent,
    PageNotFoundComponent,
    OrderPaidComponent,
    OrderFailedComponent,
    AboutUsComponent,
    ContactUsComponent,
    FaqComponent,
    PrivacyPolicyComponent,
    TermsAndConditionsComponent,
    ResultComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
