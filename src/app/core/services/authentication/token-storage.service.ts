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
      this.authenticationService.logout();
      if (isPlatformBrowser(this.platformId)) {
          localStorage.removeItem(TOKEN_KEY);
      }
      this.isAuthenticated.next(false);
      resolve();
    });
  }

  public saveToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem(TOKEN_KEY, token);
      this.isAuthenticated.next(true);
    }
  }

  public getToken(): string | null {

    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  }

  isLoggedInObservable(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
