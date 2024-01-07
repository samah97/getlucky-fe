import { Component } from '@angular/core';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm = new FormGroup({
    email: new FormControl('',{validators:[Validators.required, Validators.email], nonNullable:true}),
    password: new FormControl('',{validators:[Validators.required],nonNullable:true})
  });
  errorMessage:String = '';

  constructor(private readonly authenticationService: AuthenticationService, private router:Router){

  }

  onSubmit() {
    this.authenticationService.register(this.registerForm.value).subscribe(
      {
        next:(response)=>{
          console.log(response);
          this.router.navigate(['/pages/registration-success']);
        },
        error: (err) => {;
          this.errorMessage = err.error.detail;
          console.log(err.error.detail);
        }
      }
    );
  }

}
