import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../interfaces/user";
import {environment} from "../../../environments/environment";

const apiRoute = environment.apiVersion+'user'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  profile(): Observable<User> {
    return this.httpClient.get<User>(apiRoute+'/profile');
  }

  updateProfile(user: User): Observable<User> {
    return this.httpClient.put<User>(apiRoute+'/profile', user);
  }

  changePassword(passwordForm: any): Observable<any> {
    return this.httpClient.put(apiRoute+'/profile-pass', {
        "currentPass": passwordForm.currentPass, "newPass": passwordForm.newPass }
    );
  }

  removeProfile():Observable<any>{
      return this.httpClient.post<any>(apiRoute+'/remove-profile',{});
  }
}
