import { Component, Input, OnInit } from '@angular/core';
import { Order } from "../models/order";
import { OrderStatus } from "../core/enums/order-status";
import { OrderService } from "../core/services/order.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {

  @Input() order: Order;
  totalPrice: number
  showPaymentButton: boolean = false;

  constructor(private orderService: OrderService) {
  }

  ngOnInit(): void {
    const orderStatus = OrderStatus[this.order.status as keyof typeof OrderStatus]
    if (orderStatus == OrderStatus.UNPAID || orderStatus == OrderStatus.PAYMENT_PENDING) {
      this.showPaymentButton = true;
    }
  }
  getTotalPrice():number {
    this.totalPrice = this.order.items.reduce((total, orderItem) => {
      return total + (orderItem.quantity * orderItem.item.biddingPrice);
    }, 0);
    return 0;
  }

  payOrder() {
    this.orderService.checkoutAndRedirect(this.order.id);
  }
}
