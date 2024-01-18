import {
  Component,
  OnInit
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../../core/services/authentication/token-storage.service';
import { LoginResponse } from "../interfaces/login-response";
import { RouterStorageService } from "../../core/services/router-storage.service";
import {FacebookLoginProvider, SocialAuthService} from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', { validators: [Validators.required, Validators.email], nonNullable: true }),
    password: new FormControl('', { validators: [Validators.required], nonNullable: true })
  });
  errorMessage: string = '';
  isLoggedIn = false;

  constructor(private readonly authenticationService: AuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private tokenStorageService: TokenStorageService,
    private routerStorageService: RouterStorageService,
    private socialAuthService:SocialAuthService
  ) {
  }

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
    })
  }

  onSubmit() {
    console.log(this.loginForm.value);
    const loginFormData = this.loginForm.value;
    this.authenticationService.login(loginFormData.username!, loginFormData.password!)
      .subscribe({
        next: (response) => this.onSuccessfulLogin(response),
        error: (err) => {
          this.errorMessage = err.error.detail;
          console.log(err.error.detail);
          this.isLoggedIn = false;
        }
      });
  }

  onSuccessfulLogin = (response: LoginResponse) => {
    console.info(response);
    this.tokenStorageService.saveToken("whatisthis");
    this.isLoggedIn = true;
    const redirectUrl = this.routerStorageService.getRedirectUrl() || '/'; // Default redirect if no stored route
    this.routerStorageService.clearRedirectUrl();
    this.router.navigate([redirectUrl]);
  }

  checkUserAlreadyLoggedIn() {
    if (this.tokenStorageService.isLoggedIn()) {
      this.router.navigate(['/profile']);
    }
  }

  loginWithFacebook() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(()=>{

    });
  }
}

