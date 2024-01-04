import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiLoaderService {
  private isLoading = new BehaviorSubject<boolean>(false);
  constructor() { }

  get isLoading$() {
    return this.isLoading.asObservable();
  }

  isLoaderVisible(): boolean {
    return this.isLoading.getValue();
  }


  show() {
    this.isLoading.next(true);
  }

  hide() {
    this.isLoading.next(false);
  }

}
