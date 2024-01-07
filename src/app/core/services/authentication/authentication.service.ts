import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { LoginResponse } from '../../../authentication/interfaces/login-response';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private token:string = ''
  private localStorageKeyName = 'JWT';
  private isAuthenticated = new BehaviorSubject<boolean>(false);


  constructor(private httpClient:HttpClient,@Inject(PLATFORM_ID) private platformId: Object) {

  }

  checkAuthentication(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      this.isAuthenticated.next(!!token);
    }
  }

  login(email:string, password:string):Observable<LoginResponse>{
    console.log("Data that will be sent:")
    // console.log();
    return this.httpClient.post<LoginResponse>('auth/authenticate',
        {email, password}
    ).pipe(shareReplay(1));
  }

  googleLogin(credential:string){
    return this.httpClient.post<LoginResponse>('oauth/google', {"code":credential}, { withCredentials: true });
  }

  register(data:any){
    return this.httpClient.post('auth/signup',data);
  }

  setToken(token: string){
    this.token = token;
    // localStorage.setItem(this.localStorageKeyName, this.token);
    this.isAuthenticated.next(true);


    window.sessionStorage.setItem(this.localStorageKeyName, token);
  }

  isLoggedInObservable(): Observable<boolean> {
    // const jwt = localStorage.getItem(this.localStorageKeyName);
    // // Optionally, you can add more checks to validate the token's integrity and expiration
    // return !!jwt;
    console.log(this.isAuthenticated.asObservable());
    return this.isAuthenticated.asObservable();
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated.getValue();
  }

  logout(): void {
    localStorage.removeItem(this.localStorageKeyName);
    this.token = '';
    this.isAuthenticated.next(false);
  }

  getToken(): string {
    return this.token;
  }


}
