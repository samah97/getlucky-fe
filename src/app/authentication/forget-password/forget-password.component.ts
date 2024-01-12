import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';
import { Router } from '@angular/router';

const success_message='You will receive an email shortly to reset your password';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

errorMessage: any;
forgetPasswordForm = new FormGroup({
  email: new FormControl('', {validators: [Validators.required, Validators.email], nonNullable: true})
});

constructor(private authenticationService:AuthenticationService, private router:Router){

}

onSubmit() {
  const formData = this.forgetPasswordForm.value;
  this.authenticationService.forgetPassword(formData.email!)
  .subscribe({
      next:(response)=>{
        console.log(response);
        this.router.navigate(['/pages/result'],{queryParams: {title:'Perfect!',message:success_message}, skipLocationChange:true});
      },
      error: (err) => {
        this.errorMessage = err.error.detail;
        console.log(err.error.detail);
      }
    });
}

}
