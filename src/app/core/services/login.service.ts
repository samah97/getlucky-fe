import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private readonly http:HttpClient) { }

  login(email, password):Observable<any>{
    return this.http.post<any>("auth/authenticate", {"email": email, "password": password});
  };
}
