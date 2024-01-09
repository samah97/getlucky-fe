import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {OrderRequest} from "../interfaces/order-request";



@Injectable({
  providedIn: 'root'
})
export class OrderService {


  constructor(private http:HttpClient) { }

  makeOrder(request:OrderRequest):Observable<any>{
    return this.http.post<any>("orders",request);
  };

  hostedCheckout(orderId:string):Observable<any>{
    return this.http.post<any>("payments/checkout/hosted/"+orderId,{});
  }



}
