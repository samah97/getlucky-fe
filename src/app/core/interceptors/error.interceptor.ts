import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest, HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";
import { TokenStorageService } from "../services/authentication/token-storage.service";
import { RouterStorageService } from "../services/router-storage.service";
import {ErrorResponse} from "../../models/error-response";

const message: any = 'Please login to continue';

@Injectable({ providedIn: "root" })
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private tokenStorageService: TokenStorageService, private routerStorageService: RouterStorageService) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 403 || error.status === 401) {
            this.routerStorageService.setRedirectUrl(this.router.url);
            this.tokenStorageService.signOut();
            this.router.navigate(['/auth/login/'], { queryParams: { message: message } });
          }
          return throwError(() => error.error as ErrorResponse);
        }),
      );
  }
}
