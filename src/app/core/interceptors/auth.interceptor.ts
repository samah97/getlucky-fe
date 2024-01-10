import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {NavigationExtras, Router} from "@angular/router";
import {catchError, Observable, throwError} from "rxjs";
import {TokenStorageService} from "../services/authentication/token-storage.service";
import {RouterStorageService} from "../services/router-storage.service";

const message:any = 'Please login to continue';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private  tokenStorageService:TokenStorageService, private routerStorageService:RouterStorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          this.routerStorageService.setRedirectUrl(this.router.url);
          this.tokenStorageService.signOut();
          this.router.navigate(['/auth/login'],{queryParams: {message:message}});
        }
        // Return an observable with a user-facing error message
        return throwError(() => new Error(error.error.detail));
      })
    );
  }
}
