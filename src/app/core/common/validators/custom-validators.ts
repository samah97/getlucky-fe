import {AbstractControl, ValidatorFn} from "@angular/forms";

export class CustomValidators{
  static noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value && control.value.trim().length === 0) {
        return { 'whitespace': true };
      }
      return null;
    };
  }

  static nameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const nameRegex = /^[A-Za-z\-\'\s]+$/; // Allow letters, hyphens, apostrophes, and spaces

      if (control.value && !nameRegex.test(control.value)) {
        return { 'invalidName': true };
      }
      return null;
    };
  }
}

