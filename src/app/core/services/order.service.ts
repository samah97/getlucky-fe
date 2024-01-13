import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { OrderRequest } from "../interfaces/order-request";
import { Order } from "../../models/order";



@Injectable({
  providedIn: 'root'
})
export class OrderService {


  constructor(private http: HttpClient) { }

  myOrders(): Observable<Order[]> {
    return this.http.get<Order[]>("orders");
  }

  makeOrder(request: OrderRequest): Observable<any> {
    return this.http.post<any>("orders", request);
  }

  hostedCheckout(orderId: string): Observable<any> {
    return this.http.post<any>("payments/checkout/hosted/" + orderId, {});
  }

  checkoutAndRedirect(orderId: string) {
    this.hostedCheckout(orderId).subscribe({
      next: (value) => {
        window.location.href = value.url;
      }
    }
    );
  }
}
