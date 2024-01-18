import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ListErrorsComponent } from '../core/common/list-errors/list-errors.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { GoogleLoginComponent } from './google-login/google-login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {FacebookLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from "@abacritt/angularx-social-login";

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    GoogleLoginComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    ListErrorsComponent,
    SocialLoginModule
  ],
    providers:[{
        provide:'SocialAuthServiceConfig',
        useValue:{
            autoLogin: false,
            providers:[
                {
                    id:FacebookLoginProvider.PROVIDER_ID,
                    provider: new FacebookLoginProvider('246108031837524')
                }
            ]
        } as SocialAuthServiceConfig
    }]
})
export class AuthenticationModule {


}
