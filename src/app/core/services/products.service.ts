import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';
import {environment} from "../../../environments/environment";

const apiRoute = environment.apiVersion+'items';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) { }

  all(): Observable<Product[]> {
    return this.http.get<Product[]>(apiRoute);
  }

  findById(id: string): Observable<Product> {
    return this.http.get<Product>(apiRoute+"/" + id);
  }
}
