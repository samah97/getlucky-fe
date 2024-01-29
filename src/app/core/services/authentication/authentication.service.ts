import {HttpClient, HttpHeaders} from '@angular/common/http';
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

  login(email: string, password: string, recaptchaToken:string): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(apiRoute+'/login',
      { email, password }, { withCredentials: true,
            headers: new HttpHeaders({
                'RECAPTCHA-TOKEN':recaptchaToken
            })
        }
    ).pipe(shareReplay(1));
  }

  googleLogin(credential: string) {
    return this.httpClient.post<LoginResponse>('oauth/google', { "code": credential }, { withCredentials: true });
  }

  register(data: any, recaptchaToken:string) {
    return this.httpClient.post(apiRoute+'/signup', data,{
        headers: new HttpHeaders({
            'RECAPTCHA-TOKEN':recaptchaToken
        })
    });
  }

  logout() {
    return this.httpClient.post<any>(apiRoute+"/logout", {});
  }
}
