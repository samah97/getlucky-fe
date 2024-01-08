import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, catchError, finalize, throwError } from "rxjs";
import { ApiLoaderService } from "../services/api-loader.service";
import { error } from "console";

@Injectable({ providedIn: "root" })
export class ApiInterceptor implements HttpInterceptor {

  constructor(private apiLoaderService:ApiLoaderService){

  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("HEREEE");
    console.log(this.apiLoaderService.isLoaderVisible());
    if(!this.apiLoaderService.isLoaderVisible()){
        this.apiLoaderService.show();
        console.log("LOADER SHOWN");
    }

    let withCredentials = false;

    let url = `http://localhost:8080/`;
    if (req.url !='oauth/google'){
      url+='v1/';
    }
    if(req.url != "authenticate"){
      // withCredentials = true;
    }
    url+=req.url;
    const apiReq = req.clone({ url: url, withCredentials:true});

    return next.handle(apiReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle error
        return throwError(() => error)
      }),
      finalize(()=>{
        this.apiLoaderService.hide();
      })
    );
  }
}
