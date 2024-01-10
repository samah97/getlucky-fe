import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RouterStorageService {

  private redirectUrl: string | null = null;

  setRedirectUrl(url: string): void {
    this.redirectUrl = url;
  }

  getRedirectUrl(): string | null {
    return this.redirectUrl;
  }

  clearRedirectUrl(): void {
    this.redirectUrl = null;
  }
}
