import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { CountdownConfig } from 'ngx-countdown';
import { CountdownUtil } from '../../core/common/util/countdown-util';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{
  productId:any;
  product: any;

  config: CountdownConfig = {
    format: 'dd:HH:mm:ss',
    prettyText: (text) => CountdownUtil.formatCountdown(text)
  };

  constructor(private activatedRouteService:ActivatedRoute){
    this.productId = this.activatedRouteService.snapshot.paramMap.get("product");
    this.activatedRouteService.queryParams.subscribe((product)=>{
      console.log(product)
    this.product = product;
    })
    console.log(JSON.stringify(this.product));
  }
  ngOnInit(): void {
    if(this.product.endTime){
      // this.showCountdown = true;
      this.config.leftTime = this.product.endTime;
    }
  }

}
