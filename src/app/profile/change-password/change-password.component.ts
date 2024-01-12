import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {

changePasswordForm: FormGroup<any> = new FormGroup({
  currentPassword: new FormControl('', {validators:[Validators.required, Validators.minLength(10)]}),
  newPassword: new FormControl('', {validators:[Validators.required, Validators.minLength(10)]}),
  confirmNewPassword: new FormControl('', [Validators.required, Validators.minLength(10)])
});
errorMsg: any;

onSubmit() {
  if(this.changePasswordForm.valid && this.passwordsMatch()){
    const formData = this.changePasswordForm.value;
  }
  
}
passwordsMatch():boolean {
  return this.changePasswordForm.value.newPassword === this.changePasswordForm.value.confirmNewPassword; 
 }
}


