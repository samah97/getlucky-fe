import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UUIDValidator } from '../../core/common/util/uuidvalidator';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';

const success_message='Your password has been reset, you can now login!';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit{

errorMessage: any;
resetToken:string;
userId:string
resetPasswordForm = new FormGroup({
  newPassword: new FormControl('',{validators:[Validators.required]}),
  confirmNewPassword: new FormControl('',{validators:[Validators.required]}),
});


constructor(private route:ActivatedRoute, private router:Router, private authenticationService:AuthenticationService){

}

ngOnInit(): void {
  this.route.params.subscribe(params => {
    // Access the dynamic route parameters
    this.userId = params['userId'];
    this.resetToken = params['reset-token'];

    if(this.paramsAreValid()){
      this.router.navigate(['/pages/page-not-found']);
    }
    
    console.log('User ID:', this.userId);
    console.log('Reset Token:', this.resetToken);
  });
}

onSubmit() {
  
  if(this.resetPasswordForm.valid){
    const formData = this.resetPasswordForm.value;
    if(formData.newPassword){
      
      this.authenticationService.resetPassword(formData.newPassword,this.userId,this.resetToken).subscribe({
        next:()=>{
          this.router.navigate(['/pages/result'],{queryParams: {title:'Perfect!',message:success_message}, skipLocationChange:true});
        },
        error:(err)=>{
          this.errorMessage = err;
        }
      });
    }
  }
}

paramsAreValid():boolean{
  return !this.userId 
  || !this.resetToken 
  || !UUIDValidator.isValid(this.userId) 
  || !UUIDValidator.isValid(this.resetToken);
}

}