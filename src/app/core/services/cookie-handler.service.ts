import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class CookieHandlerService {

  constructor(private cookieService:CookieService) { }

  checkCookieExists(cookieName:string):boolean{
    return this.cookieService.check(cookieName);
  }

}
