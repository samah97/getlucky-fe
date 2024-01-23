import {Component, Input, OnInit} from '@angular/core';
import {ProductsService} from "../../core/services/products.service";
import {ProductUtil} from "../../core/common/util/product-util";
import {Product} from "../../models/product";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnInit{
  products: Product[] = [];
  @Input() showBreadcrumb!: boolean;

  constructor(private readonly productsService:ProductsService) {
  }

  ngOnInit(): void {
    this.initData();
  }

  initData():void{
    this.productsService.all().subscribe((result)=>{
      this.products = result;
    });
  }

    shouldShowProduct(product: Product) {
        return ProductUtil.shouldShowProduct(product);
    }
}
