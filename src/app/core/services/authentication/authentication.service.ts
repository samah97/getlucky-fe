import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { LoginResponse } from '../../../authentication/interfaces/login-response';
import {environment} from "../../../../environments/environment";

const apiRoute = environment.apiVersion+'auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient, @Inject(PLATFORM_ID) private platformId: any) {
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(apiRoute+'/login',
      { email, password }, { withCredentials: true }
    ).pipe(shareReplay(1));
  }

  googleLogin(credential: string) {
    return this.httpClient.post<LoginResponse>('oauth/google', { "code": credential }, { withCredentials: true });
  }

  register(data: any) {
    return this.httpClient.post(apiRoute+'/signup', data);
  }

  logout() {
    return this.httpClient.post<any>(apiRoute+"/logout", {});
  }

  forgetPassword(email: string): Observable<any> {
    return this.httpClient.post<any>("accounts/reset-pass", { email });
  }

  resetPassword(password: string, userId: string, confirmationToken: string): Observable<any> {
    return this.httpClient.post<any>("accounts/change-reset-pass/" + userId, {
      resetToken: confirmationToken,
      password
    });
  }
}
