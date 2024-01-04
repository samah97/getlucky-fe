import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  all():Observable<any>{
    return this.http.get<any>("items");
  };

  findById(id:string):Observable<Product>{
    return this.http.get<any>("items/"+id);
  }



}
