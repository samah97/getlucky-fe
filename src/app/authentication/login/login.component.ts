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
import { Router } from '@angular/router';
import { TokenStorageService } from '../../core/services/authentication/token-storage.service';
import {DOCUMENT, isPlatformBrowser} from "@angular/common";
import {GoogleScriptGenerator} from "../../core/common/util/google-script-generator";
import {LoginResponse} from "../interfaces/login-response";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm = new FormGroup({
    username: new FormControl('', {validators: [Validators.required, Validators.email], nonNullable: true}),
    password: new FormControl('', {validators: [Validators.required], nonNullable: true})
  });
  errorMessage: String = '';
  isLoggedIn = false;

  constructor(private readonly authenticationService: AuthenticationService,
              private router: Router,
              private tokenStorageService: TokenStorageService,
              private  zone:NgZone,
              @Inject(PLATFORM_ID) private platformId: Object,
              private renderer: Renderer2,
              @Inject(DOCUMENT) private document: Document
  ) {
    // this.loadGoogleSDK();
  }

  ngOnDestroy(): void {
      if(isPlatformBrowser(this.platformId)){
        (window as any).handleCredentialResponse = undefined;
      }
    }

  ngOnInit(): void {
    this.bindCallbackFunction();
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      // this.roles = this.tokenStorage.getUser().roles;
    }
  }

  bindCallbackFunction(): void {
    if(isPlatformBrowser(this.platformId)){
      (window as any).handleCredentialResponse = this.handleCredentialResponse.bind(this);
      this.loadGoogleScript();
    }
  }

  loadGoogleScript(): void {
    GoogleScriptGenerator.appendScript(this.renderer,this.document);
  }

  handleCredentialResponse(result: any) {
    this.zone.run(()=>{
      console.log("OAuth response received:", result);
        this.authenticationService.googleLogin(result.credential).subscribe(
          (response)=>this.onSuccessfulLogin(response))
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

  onSuccessfulLogin(response:LoginResponse){
    console.log(response);
    // this.authenticationService.setToken(response.token);
    // this.tokenStorageService.saveToken(response.token);
    this.tokenStorageService.saveToken("");
    this.isLoggedIn = true;
    this.router.navigate(['/']);
  }
}
