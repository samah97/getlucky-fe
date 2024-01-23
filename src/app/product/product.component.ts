import { Component, Input, OnInit } from '@angular/core';
import { CountdownConfig } from 'ngx-countdown';
import { CountdownUtil } from '../core/common/util/countdown-util';
import { Router } from '@angular/router';
import { LefttimeCalculator } from '../core/common/util/lefttime-calculator';
import {Product} from "../models/product";
import {ProductUtil} from "../core/common/util/product-util";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {

  @Input() product: Product
  @Input() additionalClass: string ='';

  showProduct: boolean = false;
  showCountdown: boolean = false;

  config: CountdownConfig = {
    format: 'dd:HH:mm:ss',
    prettyText: (text) => CountdownUtil.formatCountdown(text)
  };


  constructor(private router: Router) { }

  ngOnInit(): void {
    if(ProductUtil.shouldShowProduct(this.product)){
        this.showProduct = true;
        if (this.product.drawScheduledAt) {
            this.showCountdown = true;
            this.config.leftTime = LefttimeCalculator.calculate(this.product.drawScheduledAt);
        }
    }

  }

  handleEvent(event: any) {
    if (event.action == 'done') {
      this.showProduct = false
    }
  }
  redirectToDetails() {
    this.router.navigate(['/products/details/' + this.product.id])
  }


}
