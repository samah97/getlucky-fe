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
    confirmPassword: new FormControl('', { validators: [Validators.required], nonNullable: true }),
    consent: new FormControl('', { validators: [Validators.requiredTrue], nonNullable: true })
  });
  errorMessage: string = '';

  constructor(private readonly authenticationService: AuthenticationService,
    private router: Router,
    private tokenStorageService: TokenStorageService) {
  }

  onSubmit() {
    if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      this.errorMessage = "The passwords don't match";
      return;
    }

    this.authenticationService.register(this.registerForm.value).subscribe(
      {
        next: (response) => {
          this.router.navigate(['/pages/result'], { queryParams: { message: success_message }, skipLocationChange: true });
        },
        error: (err) => {
          this.errorMessage = err.error.detail;
          console.log(err.error.detail);
        }
      }
    );
  }

  handleGoogleSuccess = (response: LoginResponse) => {
    this.tokenStorageService.saveToken("whatinthegoogleisthis");
    this.router.navigate(['/']);
  }
}
