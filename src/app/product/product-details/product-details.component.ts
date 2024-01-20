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
import {DIALOG_TYPES} from "../../core/enums/dialog-types";
import {ErrorResponse} from "../../models/error-response";
import {API_ERROR_CODES} from "../../core/enums/api-error-codes";
import {retry} from "rxjs";

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
    header: '',
    type:DIALOG_TYPES.INFO,
    isActionButton: false
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
    if (this.bidForm.valid) {
      const orderRequest = this.createOrderRequest(productId, this.bidForm.value.quantity)
      this.orderService.makeOrder(orderRequest).subscribe(
        {
          next: (response) => {
            this.orderService.checkoutAndRedirect(response.orderId);
          },
          error: (err:ErrorResponse) => {
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

  showErrorDialog(error: ErrorResponse) {
      console.log("SHOWING ERROR DIALOG");
      console.log(error);
    this.dialog.type = DIALOG_TYPES.ERROR;
    this.dialog.display = true;
    this.dialog.message = error.detail;
    console.log("ERROR CODE");
    console.log(API_ERROR_CODES.invalid_profile)
    if(error.code === API_ERROR_CODES.invalid_profile){
        this.triggerProfileInvalidDialog();
    }
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

  triggerProfileInvalidDialog(){
      this.dialog.isActionButton = true;
      this.dialog.buttonLabel = 'Update your profile';
      this.dialog.buttonClickHandler = ()=>{
          this.router.navigate(['/profile'])
      }
  }
}
