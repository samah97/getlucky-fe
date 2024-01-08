import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {OrderRequest} from "../interfaces/order-request";



@Injectable({
  providedIn: 'root'
})
export class OrderService {

  // orderItems: { [key: string]: OrderItemRequest } = {}; // Object with dynamic keys

  // orderRequest: any = {
  //   orderItems: {}, // Initialize as an empty object
  //   // billingAddress: { /* Define Address properties */ },
  //   // shippingAddress: { /* Define Address properties */ }
  // };

  constructor(private http:HttpClient) { }

  makeOrder(request:OrderRequest):Observable<any>{
    // this.addItemToOrder(productId);
    // const orderRequest = {
    //   orderItems: {
    //     'item1': { /* Define OrderItemRequest properties */ },
    //     'item2': { /* Define OrderItemRequest properties */ },
    //     // Add more items as needed
    //   },
    //   billingAddress: { /* Define Address properties */ },
    //   shippingAddress: { /* Define Address properties */ }
    // };
    // console.log(this.orderRequest);
    return this.http.post<any>("orders",request);
  };

  addItemToOrder(productId:string): void {
    // let quantity = 1;
    // const newItemKey = productId;
    // const newItem: OrderItemRequest = { quantity };
    // const addressRequest:AddressRequest = {line1: "qweqwe",postalCode:"3572EK",city:"utrecht",country:"Lebanon"};
    // this.orderRequest.orderItems[newItemKey] = newItem;
    // this.orderRequest.billingAddress = addressRequest;
    // this.orderRequest.shippingAddress = addressRequest;
    // this.orderItems[newItemKey] = newItem;
  }

}
