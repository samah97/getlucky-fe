import { Component } from '@angular/core';
import { ProductsService } from '../core/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  products: any[] = [];

  constructor(private readonly productsService: ProductsService) {
    this.initData();
  }

  initData(): void {
    this.productsService.all().subscribe((result) => {
      this.products = result;
    });
  }

}
