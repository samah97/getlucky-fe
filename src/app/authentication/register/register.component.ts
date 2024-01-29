import { Component } from '@angular/core';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../core/services/authentication/token-storage.service';
import { FacebookLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { ReCaptchaV3Service } from 'ng-recaptcha';

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
    private socialAuthService: SocialAuthService,
    private recaptchaV3Service: ReCaptchaV3Service
  ) {}

  onSubmit() {
    if (this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      this.errorMessage = "The passwords don't match";
      return;
    }
    this.recaptchaV3Service.execute('SIGN_UP').subscribe((recaptchaToken: string) => {
      this.authenticationService.register(this.registerForm.value, recaptchaToken).subscribe({
        next: () => {
          this.router.navigate(['/pages/result'], {
            queryParams: { message: SUCCESS_MESSAGE },
            skipLocationChange: true
          });
        },
        error: (error) => {
          if (error.detail) {
            this.errorMessage = error.detail;
          }
        }
      });
    });
  }

  handleGoogleSuccess = () => {
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
