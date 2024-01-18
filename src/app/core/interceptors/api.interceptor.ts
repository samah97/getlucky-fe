import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";
import { Observable, finalize } from "rxjs";
import { ApiLoaderService } from "../services/api-loader.service";
import { TokenStorageService } from "../services/authentication/token-storage.service";
import { RouterStorageService } from "../services/router-storage.service";
import { Router } from "@angular/router";
import {environment} from "../../../environments/environment";

const message: string = 'Please login to continue';

@Injectable({ providedIn: "root" })
export class ApiInterceptor implements HttpInterceptor {

  constructor(private apiLoaderService: ApiLoaderService, private router: Router, private tokenStorageService: TokenStorageService, private routerStorageService: RouterStorageService) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.apiLoaderService.show();
    const url = environment.apiUrl + req.url;
    const apiReq = req.clone({ url: url, withCredentials: true });

    return next.handle(apiReq).pipe(
      finalize(() => {
        this.apiLoaderService.hide();
      })
    );
  }
}
