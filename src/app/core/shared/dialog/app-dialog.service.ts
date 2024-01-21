import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {DialogConfig} from "./dialog-config";

@Injectable({
  providedIn: 'root'
})
export class AppDialogService {
    private displayDialogSource = new Subject<DialogConfig>();

    displayDialog$:Observable<DialogConfig> = this.displayDialogSource.asObservable();

    showDialog(config:DialogConfig){
        config.displayDialog = true;
        this.displayDialogSource.next(config);
    }

    hideDialog(){
        this.displayDialogSource.next(
            {displayDialog:false}
        );
    }
}
