import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";
// import { JwtService } from "../services/jwt.service";
import { AuthenticationService } from "../services/authentication.service";

@Injectable({ providedIn: "root" })
export class TokenInterceptor implements HttpInterceptor {
  constructor(private readonly authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authenticationService.getToken();
    if(token){
        request = request.clone({
            setHeaders: {
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
          });
    }
    
    return next.handle(request);
  }
}
