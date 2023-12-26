import { Component } from '@angular/core';
import { ProductsService } from '../core/services/products.service';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  standalone:true,
  imports:[NgForOf]
})
export class ProductsComponent {

  products: any[] = [];

  constructor(private readonly productsService:ProductsService){
    this.initData();
  }

  initData():void{
    this.productsService.all().subscribe((result)=>{
      console.log(result);
        this.products = result;
    });
  }



}
