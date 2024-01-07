import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthenticationService } from "../services/authentication/authentication.service";
import { TokenStorageService } from "../services/authentication/token-storage.service";

@Injectable({ providedIn: "root" })
export class TokenInterceptor implements HttpInterceptor {
  constructor(private readonly authenticationService: AuthenticationService, private readonly tokenStorageService:TokenStorageService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // const token = this.authenticationService.getToken();
    // const token = this.tokenStorageService.getToken();
    // if(token){
    //     request = request.clone({
    //         setHeaders: {
    //           ...(token ? { Authorization: `Bearer ${token}` } : {}),
    //         },
    //       });
    // }

    return next.handle(request);
  }
}
