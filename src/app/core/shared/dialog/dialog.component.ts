import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DIALOG_TYPES} from "../../enums/dialog-types";
import {AppDialogService} from "./app-dialog.service";


@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrl: './dialog.component.scss',
})
export class DialogComponent implements OnInit, OnChanges {
    _dialogHeader: string = '';
    _displayDialog: boolean=false;
    _dialogMessage: string = '';
    _buttonLabel: string = 'Ok';
    _dialogType: DIALOG_TYPES = DIALOG_TYPES.INFO;
    _isActionButton:boolean = false;
    _buttonClickHandler: ()=>void;


    imageSrc: string;
    hasImage: boolean = false;
    buttonIcon: string = 'pi pi-check';

    constructor(private dialogService:AppDialogService) {
        this.dialogService.displayDialog$.subscribe((config) => {
            this._displayDialog = config.displayDialog;
            this._dialogHeader = config.dialogHeader;
            this._dialogMessage = config.dialogMessage;
            this._buttonLabel = config.buttonLabel;
            this._dialogType = config.dialogType;
            this._isActionButton = config.isActionButton;
            this._buttonClickHandler = config.buttonClickHandler;
        });
    }


    ngOnChanges(changes: SimpleChanges): void {
        if(this._displayDialog){
            if(this._dialogType == DIALOG_TYPES.SUCCESS){
                this.hasImage = true;
                this.imageSrc = "assets/images/shape/green-tick.png";
            }else if (this._dialogType == DIALOG_TYPES.ERROR){
                this.hasImage = true;
                this.imageSrc = "assets/images/shape/error-cross.png";
            }

            if(this._isActionButton){
                this.buttonIcon = '';
            }
        }
    }


  ngOnInit(): void {
      console.log('Dialog component initialized');
  }

  clickHandler():void{
    if(this._buttonClickHandler){
      this._buttonClickHandler();
    }else{
      this._displayDialog = false;
    }
  }
}
