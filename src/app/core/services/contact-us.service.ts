import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  constructor(private httpClient:HttpClient) { }

  submit(fullName:string, email:string, message:string):Observable<any>{
    return this.httpClient.post("contact-us",{
      fullName:fullName,
      email:email,
      message:message
    });
  }

}
