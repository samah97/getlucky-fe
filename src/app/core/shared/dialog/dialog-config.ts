import {DIALOG_TYPES} from "../../enums/dialog-types";

// export class DialogConfig {
//     dialogHeader?: string = '';
//     displayDialog?: boolean = true;
//     dialogMessage: string = '';
//     buttonLabel?: string = 'Ok';
//     dialogType?: DIALOG_TYPES = DIALOG_TYPES.INFO;
//     isActionButton?:boolean = false;
//     buttonClickHandler?: ()=>void;
//
// }

export interface DialogConfig {
    displayDialog?: boolean;
    dialogMessage?: string;
    dialogHeader?: string;
    buttonLabel?: string;
    dialogType?: DIALOG_TYPES;
    isActionButton?:boolean;
    buttonClickHandler?: ()=>void;

}
