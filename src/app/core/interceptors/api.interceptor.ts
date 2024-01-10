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
import {TokenStorageService} from "../services/authentication/token-storage.service";
import {RouterStorageService} from "../services/router-storage.service";
import {Router} from "@angular/router";

const message:any = 'Please login to continue';

@Injectable({ providedIn: "root" })
export class ApiInterceptor implements HttpInterceptor {

  constructor(private apiLoaderService:ApiLoaderService,private router: Router,private tokenStorageService:TokenStorageService, private routerStorageService:RouterStorageService){

  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // if(!this.apiLoaderService.isLoaderVisible()){
        this.apiLoaderService.show();
    // }


    let url = `http://localhost:8080/`;
    if (req.url !='oauth/google'){
      url+='v1/';
    }
    url+=req.url;
    const apiReq = req.clone({ url: url, withCredentials:true});

    return next.handle(apiReq).pipe(
      finalize(()=>{
        this.apiLoaderService.hide();
      })
    );
  }
}
