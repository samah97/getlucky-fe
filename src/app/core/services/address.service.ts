import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

const apiRoute = environment.apiVersion+'address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private readonly httpClient:HttpClient) { }

  myAddresses():Observable<any>{
    return this.httpClient.get(apiRoute);
  }

}
