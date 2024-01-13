import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private readonly http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>("auth/login", { "email": email, "password": password });
  }
}
