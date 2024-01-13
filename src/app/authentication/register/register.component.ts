import { Component } from '@angular/core';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../core/services/authentication/token-storage.service';
import { LoginResponse } from '../interfaces/login-response';

const success_message = 'Registration successful, you will receive an email shortly to confirm your account!';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm = new FormGroup({
    email: new FormControl('', { validators: [Validators.required, Validators.email], nonNullable: true }),
    password: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    confirmPassword: new FormControl('', { validators: [Validators.required], nonNullable: true })
  });
  errorMessage: string = '';

  constructor(private readonly authenticationService: AuthenticationService, private router: Router,
    private tokenStorageService: TokenStorageService) {

  }

  onSubmit() {
    this.authenticationService.register(this.registerForm.value).subscribe(
      {
        next: (response) => {
          console.log(response);
          this.router.navigate(['/pages/result'], { queryParams: { message: success_message }, skipLocationChange: true });
          // this.router.navigate(['/pages/registration-success']);
        },
        error: (err) => {
          this.errorMessage = err.error.detail;
          console.log(err.error.detail);
        }
      }
    );
  }

  handleGoogleSuccess = (response: LoginResponse) => {
    this.tokenStorageService.saveToken("qweqweqe123123123i1238912391283123");
    // this.isLoggedIn = true;
    this.router.navigate(['/']);
  }

}
