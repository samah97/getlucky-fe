import {ErrorHandler, Injectable} from '@angular/core';
import {AppError} from "./app-error";
import {Router} from "@angular/router";


@Injectable()
export class AppErrorHandler implements ErrorHandler{

    constructor(private router:Router) {
    }

    handleError(error: any): void {
        if(error instanceof AppError){
            this.router.navigate(['/pages/result'],
                { queryParams: { title: 'ERROR!', message: 'Something Went Wrong!',redirectUrl:'/' }
                    , skipLocationChange: true }
            );
        }
    }


}
