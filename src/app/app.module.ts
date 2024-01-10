import {NgModule} from '@angular/core';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './core/layout/header/header.component';
import {ApiInterceptor} from './core/interceptors/api.interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './core/layout/footer/footer.component';
import {LoaderComponent} from './core/layout/loader/loader.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ApiLoaderComponent} from './core/layout/api-loader/api-loader.component';
import {SharedModule} from "./core/shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ErrorInterceptor} from "./core/interceptors/error.interceptor";
import { OrderStatusTransformPipe } from './core/pipes/order-status-transform.pipe';
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
    SharedModule
  ],
  providers: [
    provideClientHydration(),
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    // {
    //   provide: 'SocialAuthServiceConfig',
    //   useValue: {
    //     autoLogin: false,
    //     providers: [
    //       {
    //         id: GoogleLoginProvider.PROVIDER_ID,
    //         provider: new GoogleLoginProvider(
    //           '266596464361-4sneak44viaa4q7pt9478g7nfci7hkec.apps.googleusercontent.com'
    //         )
    //       },
    //       // {
    //       //   id: FacebookLoginProvider.PROVIDER_ID,
    //       //   provider: new FacebookLoginProvider('246108031837524')
    //       // }
    //     ],
    //     onError: (err) => {
    //       console.error(err);
    //     }
    //   } as SocialAuthServiceConfig,
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
