import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, NgZone, OnDestroy, OnInit, PLATFORM_ID, Renderer2 } from '@angular/core';
import { GoogleScriptGenerator } from '../../core/common/util/google-script-generator';
import { AuthenticationService } from '../../core/services/authentication/authentication.service';
import { LoginComponent } from '../login/login.component';
import { LoginResponse } from '../interfaces/login-response';

@Component({
  selector: 'google-login',
  templateUrl: './google-login.component.html',
  styleUrl: './google-login.component.scss'
})
export class GoogleLoginComponent implements OnInit,OnDestroy {


  @Input() successfulLogin:Function;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private authenticationService:AuthenticationService,
    private  zone:NgZone){
  }
  ngOnInit(): void {
    this.bindCallbackFunction();
  }
  ngOnDestroy(): void {
    if(isPlatformBrowser(this.platformId)){
      (window as any).handleCredentialResponse = undefined;
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
          (response)=>this.successfulLogin(response))
    })
    // this.zone.run(()=>{
    //   console.log("OAuth response received:", result);
    //     this.authenticationService.googleLogin(result.credential).subscribe(
    //       (response)=>this.onSuccessfulLogin(response))
    // })
  }

}
