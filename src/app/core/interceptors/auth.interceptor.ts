import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpRequest
} from '@angular/common/http';
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {catchError, Observable, throwError} from "rxjs";
import {TokenStorageService} from "../services/authentication/token-storage.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private  tokenStorageService:TokenStorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        if (error.status === 403) {
          this.tokenStorageService.signOut();
          // Redirect to the login page (or any other route)
          this.router.navigate(['/auth/login']);
        }
        // Return an observable with a user-facing error message
        return throwError(() => new Error(error.error.detail));
      })
    );
  }
}
