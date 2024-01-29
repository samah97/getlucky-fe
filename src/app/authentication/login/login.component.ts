import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../../core/services/authentication/token-storage.service';
import { RouterStorageService } from '../../core/services/router-storage.service';
import { FacebookLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { ErrorResponse } from '../../models/error-response';
import { TokenGenerationUtil } from '../../core/common/util/token-generation-util';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true
    }),
    password: new FormControl('', { validators: [Validators.required], nonNullable: true })
  });
  errorMessage: string = '';
  isLoggedIn = false;
  passwordInClear = false;

  constructor(
    private readonly authenticationService: AuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tokenStorageService: TokenStorageService,
    private routerStorageService: RouterStorageService,
    private socialAuthService: SocialAuthService,
    private recaptchaV3Service: ReCaptchaV3Service
  ) {}

  ngOnInit(): void {
    this.checkUserAlreadyLoggedIn();
    this.checkExistQueryParams();
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
    }
  }

  private checkExistQueryParams() {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.errorMessage = params?.['message'];
    });
  }

  onSubmit() {
    const loginFormData = this.loginForm.value;
    this.recaptchaV3Service.execute('LOGIN').subscribe((recaptchaToken: string) => {
      this.authenticationService.login(loginFormData.email!, loginFormData.password!, recaptchaToken).subscribe({
        next: () => this.onSuccessfulLogin(),
        error: (error: ErrorResponse) => {
          if (error.detail) {
            this.errorMessage = error.detail;
          }
          this.isLoggedIn = false;
        }
      });
    });
  }
  onSuccessfulLogin = () => {
    this.tokenStorageService.saveToken(TokenGenerationUtil.generate(40));
    this.isLoggedIn = true;

    const redirectUrl = this.routerStorageService.getRedirectUrl() || '/'; // Default redirect if no stored route
    this.routerStorageService.clearRedirectUrl();
    this.router.navigate([redirectUrl]);
  };

  checkUserAlreadyLoggedIn() {
    if (this.tokenStorageService.isLoggedIn()) {
      this.router.navigate(['/profile']);
    }
  }

  loginWithFacebook() {
    console.log('Logging In with Facebook');
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(() => {});
  }

  togglePasswordInClear() {
    this.passwordInClear = !this.passwordInClear;
  }
}
