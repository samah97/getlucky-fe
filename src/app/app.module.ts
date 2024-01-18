import { NgModule } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { ApiInterceptor } from './core/interceptors/api.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './core/layout/footer/footer.component';
import { LoaderComponent } from './core/layout/loader/loader.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiLoaderComponent } from './core/layout/api-loader/api-loader.component';
import { SharedModule } from "./core/shared/shared.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ErrorInterceptor } from "./core/interceptors/error.interceptor";
import {environment} from "../environments/environment";
import {RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module} from "ng-recaptcha";
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoaderComponent,
    ApiLoaderComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    RecaptchaV3Module
  ],
  providers: [
    provideClientHydration(),
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
        provide:RECAPTCHA_V3_SITE_KEY,
        useValue:environment.siteKey
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
