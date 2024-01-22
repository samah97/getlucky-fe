import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from "@angular/common";
import { AuthenticationService } from "./authentication.service";

const TOKEN_KEY = 'auth-token';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private authenticationService: AuthenticationService) {
    this.isAuthenticated.next(this.isLoggedIn());
  }

  signOut(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.authenticationService.logout().subscribe({
        next: () => {
            console.log("Logged Out");
          if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem(TOKEN_KEY);
          }
          this.isAuthenticated.next(false);
          resolve();
        }
      });
      resolve();
    });
  }

  public saveToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(TOKEN_KEY, token);
      this.isAuthenticated.next(true);
      console.log("Token Saved");
    }
  }

  public getToken(): string | null {

    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  }

  public saveUser(user: any): void {
    // window.sessionStorage.removeItem(USER_KEY);
    // window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  isLoggedInObservable(): Observable<boolean> {
    console.log(this.isAuthenticated.asObservable());
    return this.isAuthenticated.asObservable();
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
