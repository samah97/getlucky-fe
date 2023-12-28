import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { Observable, endWith } from 'rxjs';
import { CountdownPipe } from '../core/pipes/countdown.pipe';
import { CountdownConfig, CountdownModule } from 'ngx-countdown';
import { Product } from '../models/product';
import { CountdownUtil } from '../core/common/util/countdown-util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit{


  @Input() product: any;
  showProduct: boolean=true;
  showCountdown:boolean=false;

  config: CountdownConfig = {
    format: 'dd:HH:mm:ss',
    prettyText: (text) => CountdownUtil.formatCountdown(text)
  };

  constructor(private router:Router){}

  ngOnInit(): void {
    if(this.product.endTime){
      this.showCountdown = true;
      this.config.leftTime = this.product.endTime;
    }
  }

  handleEvent(event: any ){
    if(event.action == 'done'){
      this.showProduct = false
    }
  }

  showDetails(productId: string) {
    this.router.navigate(['/products/detail',{productId:productId}],{queryParams: this.product, skipLocationChange:true})
  }


}
