import { Component } from '@angular/core';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../core/services/authentication/token-storage.service';
import { LoginResponse } from '../interfaces/login-response';
import { FacebookLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';

const SUCCESS_MESSAGE = 'Registration successful; you will receive an email shortly to confirm your account!';

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
  passwordInClear: boolean = false;
  password2InClear: boolean = false;

  constructor(
    private readonly authenticationService: AuthenticationService,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private socialAuthService: SocialAuthService
  ) {}

  onSubmit() {
    if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      this.errorMessage = "The passwords don't match";
      return;
    }

    this.authenticationService.register(this.registerForm.value).subscribe({
      next: (response) => {
        this.router.navigate(['/pages/result'], {
          queryParams: { message: SUCCESS_MESSAGE },
          skipLocationChange: true
        });
      },
      error: (err) => {
        this.errorMessage = err.error.detail;
        console.log(err.error.detail);
      }
    });
  }

  handleGoogleSuccess = (response: LoginResponse) => {
    this.tokenStorageService.saveToken('whatinthegoogleisthis');
    this.router.navigate(['/']);
  };

  loginWithFacebook() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(() => {});
  }

  togglePasswordInClear() {
    this.passwordInClear = !this.passwordInClear;
  }

  togglePassword2InClear() {
    this.password2InClear = !this.password2InClear;
  }
}
