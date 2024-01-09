import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../../models/product';
import {CountdownConfig} from 'ngx-countdown';
import {CountdownUtil} from '../../core/common/util/countdown-util';
import {ProductsService} from '../../core/services/products.service';
import {LefttimeCalculator} from '../../core/common/util/lefttime-calculator';
import {OrderService} from "../../core/services/order.service";
import {OrderRequest} from "../../core/interfaces/order-request";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{

  dialog = {
    buttonLabel:'Ok',
    display: false,
    message:'',
    buttonClickHandler:this.closeDialog,
    header:''
  }

  productId:any;
  product:Product = new Product("","");
  config: CountdownConfig = {
    format: 'dd:HH:mm:ss',
    prettyText: (text) => CountdownUtil.formatCountdown(text)
  };

  constructor(private route:ActivatedRoute,
              private readonly productService:ProductsService,
              private readonly orderService:OrderService,
              private readonly router:Router
              ){
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
          this.config.leftTime = LefttimeCalculator.calculate(this.product.drawScheduledAt);
        }
    });
  }

  bidNow(productId: string) {
    const orderRequest = this.createOrderRequest(productId)
    this.orderService.makeOrder(orderRequest).subscribe(
      {
        next:(response)=>{
          console.log(response);
          this.orderService.hostedCheckout(response.orderId).subscribe({
            next:value => {
              console.log("Received URL = "+value.url);
              window.location.href = value.url;
              // console.log("Hosted Checkout Response");
              // console.log(value);
            }
          });
        },
        error: (err) => {
          console.log("ERROR Is= ");
          console.log(err);
          this.showErrorDialog(err);
        }
      });
  }

  createOrderRequest(productId:string):OrderRequest{
    const order: OrderRequest = {
      orderItems: {
        [productId]: { quantity: 1 },
      },
      shippingAddress: null,
      billingAddress: null,
    };
    return order;
  }

  showErrorDialog(message:string){
    this.dialog.header = 'Error'
    this.dialog.display = true;
    this.dialog.message = message;
  }

  redirectLogin() {
    console.log("OK CLICKED!!");
    this.router.navigate(['/auth/login'])
    // this.router.navigate(["/auth/login"]);
  }

  closeDialog(){
    this.dialog.display = false;
  }
}
