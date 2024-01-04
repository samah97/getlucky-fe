import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/services/authentication.service';
import { Router } from '@angular/router';
import { ListErrorsComponent } from '../../core/common/list-errors/list-errors.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm = new FormGroup({
    username: new FormControl('',{validators:[Validators.required,Validators.email],nonNullable:true}),
    password: new FormControl('',{validators:[Validators.required],nonNullable:true})
  });
  errorMessage:String = '';

  constructor(private readonly authenticationService:AuthenticationService, private router:Router){}

  onSubmit() {
    console.log(this.loginForm.value);
    this.authenticationService.login(this.loginForm.value)
    .subscribe({
        next:(response)=>{
          console.log(response);
          this.authenticationService.setToken(response.token);
          this.router.navigate(['/']);
        },
        error: (err) => {;
          this.errorMessage = err.error.detail; 
          console.log(err.error.detail);
        }
      }
      );
  }
}
