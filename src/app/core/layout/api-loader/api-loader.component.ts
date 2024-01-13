import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiLoaderService } from '../../services/api-loader.service';

@Component({
  selector: 'app-api-loader',
  templateUrl: './api-loader.component.html',
  styleUrl: './api-loader.component.scss'
})
export class ApiLoaderComponent implements OnDestroy {
  @Input() isLoading: boolean = false;
  private subscription: Subscription;

  constructor(private loaderService: ApiLoaderService) {
    this.subscription = this.loaderService.isLoading$.subscribe(
      (value) => {
        this.isLoading = value;
      }
    )
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
