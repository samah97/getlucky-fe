import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { ApiInterceptor } from './core/interceptors/api.interceptor';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { ProductsComponent } from './products/products.component';
import { CountdownPipe } from './core/pipes/countdown.pipe';
// import { CategoryComponent } from './category/category.component';
// import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    CountdownPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderComponent
  ],
  providers: [
    provideClientHydration(),
    // provideHttpClient(withFetch()),
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
