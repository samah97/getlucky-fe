import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { LoginResponse } from '../../../authentication/interfaces/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>('auth/login',
      { email, password }, { withCredentials: true }
    ).pipe(shareReplay(1));
  }

  googleLogin(credential: string) {
    return this.httpClient.post<LoginResponse>('oauth/google', { "code": credential }, { withCredentials: true });
  }

  register(data: any) {
    return this.httpClient.post('auth/signup', data);
  }

  logout() {
    return this.httpClient.post<any>("auth/logout", {});
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
