import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private readonly http:HttpClient) { }
  all():Observable<any>{
    return this.http.get<any>("categories");
  };

}
