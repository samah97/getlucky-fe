import { Component } from '@angular/core';
import { ProductsService } from '../core/services/products.service';
import {Product} from "../models/product";
import {ProductUtil} from "../core/common/util/product-util";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  products: Product[];

  constructor(private readonly productsService: ProductsService) {
    this.initData();
  }

  initData(): void {
    this.productsService.all().subscribe((result) => {
      this.products = result;
    });
  }

    shouldShowProduct(product: Product):boolean {
        return ProductUtil.shouldShowProduct(product);
    }
}
