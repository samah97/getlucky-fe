import { Component, OnInit } from '@angular/core';
import { OrderService } from "../../core/services/order.service";
import { Order } from "../../models/order";
import { ProductsService } from "../../core/services/products.service";

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss'
})
export class MyOrdersComponent implements OnInit {
  paidOrders: Order[];
  pendingPaymentOrders: Order[];
  products: any[] = [];

  constructor(private orderService: OrderService, private productsService: ProductsService) {
  }

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.orderService.myOrders().subscribe({
      next: (response) => {
        this.paidOrders = response.filter(order => order.status === 'PAID');
        this.pendingPaymentOrders = response.filter(order => order.status === 'UNPAID' || order.status === 'PAYMENT_PENDING');
        console.log(this.paidOrders);
      }
    })
    this.productsService.all().subscribe((result) => {
      this.products = result;
    });
  }
}
