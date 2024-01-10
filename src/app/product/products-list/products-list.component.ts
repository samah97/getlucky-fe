import {Component, Input, OnInit} from '@angular/core';
import {ProductsService} from "../../core/services/products.service";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnInit{
  products: any[] = [];
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

}
