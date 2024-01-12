import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationSuccessComponent } from './registration-success/registration-success.component';
import {OrderPaidComponent} from "./order-paid/order-paid.component";
import {OrderFailedComponent} from "./order-failed/order-failed.component";
import {AboutUsComponent} from "./about-us/about-us.component";
import {ContactUsComponent} from "./contact-us/contact-us.component";
import {FaqComponent} from "./faq/faq.component";
import {PrivacyPolicyComponent} from "./privacy-policy/privacy-policy.component";
import {TermsAndConditionsComponent} from "./terms-and-conditions/terms-and-conditions.component";
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  { path: "registration-success", component:RegistrationSuccessComponent},
  { path: "order-success", component:OrderPaidComponent},
  { path: "order-failed", component:OrderFailedComponent},
  { path: "about-us", component:AboutUsComponent},
  { path: "contact-us", component:ContactUsComponent},
  { path: "faq", component:FaqComponent},
  { path: "privacy-policy", component:PrivacyPolicyComponent},
  { path: "terms-conditions", component:TermsAndConditionsComponent},
  { path: "result", component:ResultComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {



}
