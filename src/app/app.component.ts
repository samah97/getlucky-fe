import { Component } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { LoaderService } from './core/services/loader.service';
import { ViewportScroller } from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  // styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'GetLuck';

  constructor(private router: Router, private loaderService: LoaderService, private viewportScroller: ViewportScroller) {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.loaderService.show();
      } else if (event instanceof NavigationEnd) {
        this.loaderService.hide();
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });
  }
}
