import { Injectable } from '@angular/core';
import {Observable, throwError} from "rxjs";
import { HttpClient } from "@angular/common/http";
import { OrderRequest } from "../interfaces/order-request";
import { Order } from "../../models/order";
import {environment} from "../../../environments/environment";
import {AppError} from "../handler/app-error";

const apiRoute = environment.apiVersion+'orders'

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  constructor(private http: HttpClient) { }

  myOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(apiRoute);
  }

  makeOrder(request: OrderRequest): Observable<any> {
    return this.http.post<any>(apiRoute, request);
  }

  private hostedCheckout(orderId: string): Observable<any> {
    return this.http.post<any>(environment.apiVersion+"payments/checkout/hosted/" + orderId, {});
  }

  checkoutAndRedirect(orderId: string) {
    this.hostedCheckout(orderId).subscribe({
      next: (value) => {
        window.location.href = value.url;
      },
      error:()=>{
          throw new AppError('Checkout failed'); // Throw an error
      }
    }
    );
  }
}
