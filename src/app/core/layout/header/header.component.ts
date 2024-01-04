import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  isLoggedIn = this.authenticationService.isLoggedIn();

  constructor(private readonly authenticationService:AuthenticationService){
  }


  logout() {
    this.authenticationService.logout();
  }

}
