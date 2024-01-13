import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  profile(): Observable<User> {
    return this.httpClient.get<User>('user/profile');
  }

  updateProfile(user: User): Observable<User> {
    return this.httpClient.put<User>('user/profile', user);
  }

  changePassword(passwordForm: any): Observable<any> {
    return this.httpClient.put('user/profile-pass', { "currentPass": passwordForm.currentPass, "newPass": passwordForm.newPass });
  }
}
