import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { LoaderService } from './core/services/authentication/loader.service';
import { AuthenticationService } from './core/services/authentication/authentication.service';
import {ViewportScroller} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'getlucky-app';

  constructor(private router: Router, private loaderService: LoaderService,private viewportScroller:ViewportScroller) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loaderService.show();
      } else if (event instanceof NavigationEnd) {
        this.loaderService.hide();
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });


  }
}
