import { Component } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  loading: boolean | undefined;

  constructor(private loaderService: LoaderService){
    this.loaderService.loading$.subscribe((loading: boolean) => {
      this.loading = loading;
    });
  }
}
