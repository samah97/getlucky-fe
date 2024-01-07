import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {isPlatformBrowser} from "@angular/common";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  signOut(): void {
    // window.sessionStorage.clear();
    // localStorage.clear();
    sessionStorage.clear();
    this.isAuthenticated.next(false);
  }

  public saveToken(token: string): void {
    // window.sessionStorage.removeItem(TOKEN_KEY);
    // window.sessionStorage.setItem(TOKEN_KEY, token);
    // localStorage.removeItem(TOKEN_KEY);
    // localStorage.setItem(TOKEN_KEY, token);
    if(isPlatformBrowser(this.platformId)){
      // sessionStorage.setItem(TOKEN_KEY, token);
      this.isAuthenticated.next(true);
    }
  }

  public getToken(): string | null {
    // return localStorage.getItem(TOKEN_KEY);
    if(isPlatformBrowser(this.platformId)){
      return sessionStorage.getItem(TOKEN_KEY);
    }
    return null;
    // return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    // window.sessionStorage.removeItem(USER_KEY);
    // window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));

  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  isLoggedInObservable(): Observable<boolean> {
    console.log(this.isAuthenticated.asObservable());
    return this.isAuthenticated.asObservable();
  }
}
