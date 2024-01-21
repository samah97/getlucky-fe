import { Component } from '@angular/core';
import { TokenStorageService } from '../../services/authentication/token-storage.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  isLoggedIn = this.tokenStorageService.isLoggedInObservable();

  constructor(private readonly tokenStorageService:TokenStorageService, private readonly router:Router){
  }


  logout() {
    this.tokenStorageService.signOut().then(()=>{
      this.router.navigate(["/"]);
    });
  }
}
