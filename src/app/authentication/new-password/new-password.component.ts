import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss'
})
export class NewPasswordComponent {

  constructor(private authenticationService:AuthenticationService){

  }
errorMessage: any;
userId:string;
confirmationToken:string;

resetPasswordForm = new FormGroup({
  newPassword: new FormControl('', {validators: [Validators.required, Validators.min(8)], nonNullable: true}),
  confirmNewPassword: new FormControl('', {validators: [Validators.required, Validators.min(8)], nonNullable: true})
});


onSubmit() {
  const formData = this.resetPasswordForm.value;
  if(this.isValidForm(formData)){
      this.authenticationService.resetPassword(formData.newPassword!,this.userId, this.confirmationToken).subscribe({
        next:(response)=>{
          console.log(response);
        }
      });
  }
}

isValidForm(formData: Partial<{ newPassword: string; confirmNewPassword: string; }>):boolean {
  if(formData.newPassword !== formData.confirmNewPassword){
      this.errorMessage = "Passwords Don't match";
      return false;
  }
  return true;
}

}


