import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent implements  OnInit{
  @Input() dialogHeader:string = '';
  @Input() displayDialog: boolean = false;
  @Input() dialogMessage: string = '';
  @Input() buttonLabel:string = 'Ok';

  @Input() buttonClickHandler:Function;

  constructor() {

  }

  ngOnInit(): void {

  }

  showDialog(): void {
    this.displayDialog = true;
  }

  hideDialog(): void {
    this.displayDialog = false;
  }

  clickHandler():void{
    if(this.buttonClickHandler){
      this.buttonClickHandler();
    }else{
      this.displayDialog = false;
    }
  }
}
