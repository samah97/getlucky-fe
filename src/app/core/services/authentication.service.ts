import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../../authentication/interfaces/login-response';
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

  login(data:any):Observable<LoginResponse>{
    console.log("Data that will be sent:")
    console.log(data);
    return this.httpClient.post<LoginResponse>('auth/authenticate',data);
  }

  register(data:any){
    console.log("Registration Data that will be sent:")
    console.log(data);
    return this.httpClient.post('auth/new-account',data);
  }

  setToken(token: string){
    this.token = token;
    localStorage.setItem(this.localStorageKeyName, this.token);
    this.isAuthenticated.next(true);
  }

  isLoggedIn(): Observable<boolean> {
    // const jwt = localStorage.getItem(this.localStorageKeyName);
    // // Optionally, you can add more checks to validate the token's integrity and expiration
    // return !!jwt;
    console.log(this.isAuthenticated.asObservable());
    return this.isAuthenticated.asObservable();
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