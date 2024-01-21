import {DIALOG_TYPES} from "../../enums/dialog-types";

export class DialogConfig {
    dialogHeader: string = '';
    displayDialog: boolean;
    dialogMessage: string = '';
    buttonLabel: string = 'Ok';
    dialogType: DIALOG_TYPES = DIALOG_TYPES.INFO;
    isActionButton:boolean = false;
    buttonClickHandler: ()=>void;
    constructor(displayDialog:boolean) {
        this.displayDialog = displayDialog;
    }
}
