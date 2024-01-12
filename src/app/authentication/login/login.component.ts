import {
  Component,
  ElementRef,
  Inject,
  NgZone,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  ViewChild
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import { TokenStorageService } from '../../core/services/authentication/token-storage.service';
import {DOCUMENT, isPlatformBrowser} from "@angular/common";
import {GoogleScriptGenerator} from "../../core/common/util/google-script-generator";
import {LoginResponse} from "../interfaces/login-response";
import {RouterStorageService} from "../../core/services/router-storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', {validators: [Validators.required, Validators.email], nonNullable: true}),
    password: new FormControl('', {validators: [Validators.required, Validators.minLength(8)], nonNullable: true})
  });
  errorMessage: String = '';
  isLoggedIn = false;

  constructor(private readonly authenticationService: AuthenticationService,
              private router: Router,
              private activatedRoute:ActivatedRoute,
              private tokenStorageService: TokenStorageService,
              private routerStorageService:RouterStorageService
              
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
    this.activatedRoute.queryParams.subscribe((params)=>{
      console.log(params);
      this.errorMessage = params?.['message'];
    })
  }

  onSubmit() {
    console.log(this.loginForm.value);
    const loginFormData = this.loginForm.value;
    this.authenticationService.login(loginFormData.username!, loginFormData.password!)
    .subscribe({
        next:(response)=>this.onSuccessfulLogin(response),
        error: (err) => {
          this.errorMessage = err.error.detail;
          console.log(err.error.detail);
          this.isLoggedIn = false;
        }
      });
  }

  onSuccessfulLogin = (response:LoginResponse)=>{
    console.log(this);
    console.log("In onSuccessfulLogin");
    console.log(response);
    this.tokenStorageService.saveToken("qweqweqe123123123i1238912391283123");
    this.isLoggedIn = true;
    const redirectUrl = this.routerStorageService.getRedirectUrl() || '/'; // Default redirect if no stored route
    this.routerStorageService.clearRedirectUrl();
    this.router.navigate([redirectUrl]);
  }
  // onSuccessfulLogin(response:LoginResponse){
    
  // }

  checkUserAlreadyLoggedIn() {
    if(this.tokenStorageService.isLoggedIn()){
      this.router.navigate(['/profile']);
    }
  }
  
}

