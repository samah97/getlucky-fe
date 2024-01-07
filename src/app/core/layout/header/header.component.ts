import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { TokenStorageService } from '../../services/authentication/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  isLoggedIn = this.tokenStorageService.isLoggedInObservable();

  constructor(private readonly tokenStorageService:TokenStorageService){
  }


  logout() {
    this.tokenStorageService.signOut();
  }

}
