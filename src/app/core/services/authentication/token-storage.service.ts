import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {DOCUMENT, isPlatformBrowser} from "@angular/common";
import {CookieHandlerService} from "../cookie-handler.service";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const COOKIE_KEY = 'token';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private cookieHandlerService:CookieHandlerService) {
    this.isAuthenticated.next(this.isLoggedIn());
  }

  signOut():Promise<void> {
    return new Promise((resolve, reject) => {
      console.log("SIGNING OUT");
      if(isPlatformBrowser(this.platformId)){
        console.log("REMOVING ITEM");
        localStorage.removeItem(TOKEN_KEY);
      }
      this.isAuthenticated.next(false);
    });
  }

  public saveToken(token: string): void {
    if(isPlatformBrowser(this.platformId)){
      localStorage.setItem(TOKEN_KEY, token);
      // sessionStorage.setItem(TOKEN_KEY, token);
      this.isAuthenticated.next(true);
      console.log("Token Saved");
    }
  }

  public getToken(): string | null {

    if(isPlatformBrowser(this.platformId)){
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  }

  public saveUser(user: any): void {
    // window.sessionStorage.removeItem(USER_KEY);
    // window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  // public getUser(): any {
  //   const user = window.sessionStorage.getItem(USER_KEY);
  //   if (user) {
  //     return JSON.parse(user);
  //   }
  //
  //   return {};
  // }

  isLoggedInObservable(): Observable<boolean> {
    console.log(this.isAuthenticated.asObservable());
    return this.isAuthenticated.asObservable();
  }

  isLoggedIn():boolean{
    return !!this.getToken();
  }

}
