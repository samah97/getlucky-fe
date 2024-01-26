import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const apiRoute = environment.apiVersion + 'accounts';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private readonly httpClient: HttpClient) {}

  forgetPassword(email: string): Observable<any> {
    return this.httpClient.post<any>(apiRoute + '/reset-pass', { email });
  }

  resetPassword(password: string, userId: string, confirmationToken: string): Observable<any> {
    return this.httpClient.post<any>(apiRoute + '/change-reset-pass/' + userId, {
      resetToken: confirmationToken,
      password
    });
  }

  confirmAccount(userId: string, confirmationToken: string): Observable<any> {
    return this.httpClient.post<any>(apiRoute + '/confirm-account/' + userId, {
      token: confirmationToken
    });
  }
}
