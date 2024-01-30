import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../models/order';
import { ProductsService } from '../../core/services/products.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss'
})
export class MyOrdersComponent implements OnInit {
  paidOrders: Order[];
  pendingPaymentOrders: Order[];
  products: any[] = [];

  constructor(
    private orderService: OrderService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.orderService.myOrders().subscribe({
      next: (response) => {
        this.paidOrders = response.filter((order) => order.status === 'PAID');
        // TODO UNPAID = cart
        // TODO PAYMENT_CONFIRMATION_PENDING = payment started but we didn't receive confirmation from Stripe yet
        this.pendingPaymentOrders = response.filter(
          (order) => order.status === 'UNPAID' || order.status === 'PAYMENT_CONFIRMATION_PENDING'
        );
      }
    });
    this.productsService.all().subscribe((result) => {
      this.products = result;
    });
  }
}
