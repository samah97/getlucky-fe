import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  constructor(private httpClient:HttpClient) { }

  submit(fullName:string, email:string, message:string, recaptchaToken:string):Observable<any>{
    return this.httpClient.post(environment.apiVersion+"contact-us",{
      fullName:fullName,
      email:email,
      message:message
    },{
        headers: new HttpHeaders({
            'RECAPTCHA-TOKEN':recaptchaToken
        })
    });
  }

}
