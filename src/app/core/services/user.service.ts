import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient:HttpClient) { }

  profile():Observable<any>{
    console.log("GETTING PROFILE");
    return this.httpClient.get<any>('user/profile');
  }

}
