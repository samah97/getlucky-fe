import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product';
import { CountdownConfig } from 'ngx-countdown';
import { CountdownUtil } from '../../core/common/util/countdown-util';
import { ProductsService } from '../../core/services/products.service';
import { LefttimeCalculator } from '../../core/common/util/lefttime-calculator';
import { OrderService } from "../../core/services/order.service";
import { OrderRequest } from "../../core/interfaces/order-request";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {

  dialog = {
    buttonLabel: 'Ok',
    display: false,
    message: '',
    buttonClickHandler: this.closeDialog,
    header: ''
  }
  productId: any;
  product: Product = new Product("", "");
  config: CountdownConfig = {
    format: 'dd:HH:mm:ss',
    prettyText: (text) => CountdownUtil.formatCountdown(text)
  };

  quantity: number = 1;
  total: number;

  bidForm = new FormGroup({
    quantity: new FormControl('1', { validators: [Validators.required, Validators.min(1)], nonNullable: true })
  });

  constructor(private route: ActivatedRoute,
    private readonly productService: ProductsService,
    private readonly orderService: OrderService,
    private readonly router: Router
  ) {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get("id");
    })
    // this.productId = this.activatedRouteService.snapshot.paramMap.get("productId");
    // this.activatedRouteService.queryParams.subscribe((product)=>{
    //   console.log(product)
    //   this.product = product;
    //   this.productId = productId;
    // })
    console.log(this.productId);

  }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.productService.findById(this.productId).subscribe((result) => {
      this.product = result;
      if (this.product.drawScheduledAt) {
        this.config.leftTime = LefttimeCalculator.calculate(this.product.drawScheduledAt);
      }
      this.total = this.calculateTotalPrice();
    });
  }

  bidNow(productId: string) {
    console.log("Submitting");
    if (this.bidForm.valid) {
      console.log(this.bidForm.value);
      const orderRequest = this.createOrderRequest(productId, this.bidForm.value.quantity)
      this.orderService.makeOrder(orderRequest).subscribe(
        {
          next: (response) => {
            console.log(response);
            this.orderService.checkoutAndRedirect(response.orderId);
          },
          error: (err) => {
            console.log(err);
            this.showErrorDialog(err);
          }
        });
    }

  }

  createOrderRequest(productId: string, quantity: any): OrderRequest {
    const order: OrderRequest = {
      orderItems: {
        [productId]: { quantity: quantity },
      },
      shippingAddress: null,
      billingAddress: null,
    };
    return order;
  }

  showErrorDialog(message: string) {
    this.dialog.header = 'Error'
    this.dialog.display = true;
    this.dialog.message = message;
  }

  redirectLogin() {
    console.log("OK CLICKED!!");
    this.router.navigate(['/auth/login'])
    // this.router.navigate(["/auth/login"]);
  }

  closeDialog() {
    this.dialog.display = false;
  }

  calculateTotalPrice(): number {

    const quantity = parseInt(this.bidForm.value.quantity ?? '1');
    return quantity * (this.product!.biddingPrice || 0);
  }

  quantityChange() {
    let quantityData = parseInt(this.bidForm.value.quantity!);
    if (quantityData < 1) {
      this.bidForm.patchValue({
        quantity: '1'
      });
      quantityData = 1;
    }
    this.quantity = quantityData;
    this.total = this.calculateTotalPrice();
  }
}
