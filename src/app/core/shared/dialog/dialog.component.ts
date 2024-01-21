import {AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {DIALOG_TYPES} from "../../enums/dialog-types";


@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrl: './dialog.component.scss',
})
export class DialogComponent implements OnInit, OnChanges,OnDestroy {
    @Input() dialogHeader: string = '';
    @Input() displayDialog: boolean = true;
    @Input() dialogMessage: string = '';
    @Input() buttonLabel: string = 'Ok';
    @Input() dialogType: DIALOG_TYPES = DIALOG_TYPES.INFO;
    @Input() isActionButton:boolean = false;
    // @Input() buttonClickHandler: Function;
    @Input() buttonClickHandler: ()=>void;
    imageSrc: string;
    hasImage: boolean = false;
    buttonIcon: string = 'pi pi-check';

    constructor() {

    }

    ngOnDestroy(): void {
        console.log("Dialog Destroyed");
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(this.displayDialog){
            if(this.dialogType == DIALOG_TYPES.SUCCESS){
                this.hasImage = true;
                this.imageSrc = "assets/images/shape/green-tick.png";
            }else if (this.dialogType == DIALOG_TYPES.ERROR){
                this.hasImage = true;
                this.imageSrc = "assets/images/shape/error-cross.png";
            }

            if(this.isActionButton){
                this.buttonIcon = '';
            }

        }
    }


  ngOnInit(): void {
      console.log('Dialog component initialized');
  }

  clickHandler():void{
    if(this.buttonClickHandler){
      this.buttonClickHandler();
    }else{
      this.displayDialog = false;
    }
  }
}
