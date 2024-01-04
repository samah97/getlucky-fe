import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { CountdownConfig } from 'ngx-countdown';
import { CountdownUtil } from '../../core/common/util/countdown-util';
import { ProductsService } from '../../core/services/products.service';
import { Observable } from 'rxjs';
import { LefttimeCalculator } from '../../core/common/util/lefttime-calculator';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{

  productId:any;
  product:Product = new Product("","");
  config: CountdownConfig = {
    format: 'dd:HH:mm:ss',
    prettyText: (text) => CountdownUtil.formatCountdown(text)
  };

  constructor(private route:ActivatedRoute, private readonly productService:ProductsService){
    this.route.paramMap.subscribe(params=>{
      this.productId = params.get("id");
    })
    // this.productId = this.activatedRouteService.snapshot.paramMap.get("productId");
    // this.activatedRouteService.queryParams.subscribe((product)=>{
    //   console.log(product)
    //   this.product = product;
    //   this.productId = productId;
    // })
    console.log(this.productId);
    this.initData();
  }

  ngOnInit(): void {

  }

  initData() {
    this.productService.findById(this.productId).subscribe((result)=>{
        this.product = result;
        if(this.product.drawScheduledAt){
          // this.showCountdown = true;
          this.config.leftTime = LefttimeCalculator.calculate(this.product.drawScheduledAt);
        }
    });
  }

  bidNow(productId: string) {
    
  }

}
