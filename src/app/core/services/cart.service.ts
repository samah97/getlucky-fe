import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Order} from "../../models/order";
import {OrderRequest} from "../interfaces/order-request";

const apiRoute = environment.apiVersion+'cart'


@Injectable({
  providedIn: 'root'
})
export class CartService {

    constructor(private http: HttpClient) { }

    getCartItems():Observable<Order>{
        return this.http.get<Order>(apiRoute)
    }

    updateCart(request: OrderRequest):Observable<any>{
        return this.http.post(apiRoute,request);
    }

}
