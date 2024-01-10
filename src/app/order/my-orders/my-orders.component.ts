import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../core/services/order.service";
import {Order} from "../../models/order";
import {OrderStatus} from "../../core/enums/order-status";
import {ProductsService} from "../../core/services/products.service";

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss'
})
export class MyOrdersComponent implements OnInit{
  // orders: any[] = [
  //   {
  //     orderDate: '2024-01-01',
  //     itemName: 'Product Name 1',
  //     itemImageUrl: 'assets/images/product/details22.png',
  //     numItems: 1,
  //     totalPrice: '$25.00',
  //     orderStatus: 'Shipped'
  //   },
  //   {
  //     orderDate: '2024-01-05',
  //     itemName: 'Product Name 2',
  //     itemImageUrl: 'assets/images/product/details22.png',
  //     numItems: 1,
  //     totalPrice: '$35.00',
  //     orderStatus: 'Processing'
  //   },
  //   // Add more orders as needed
  // ];
  // orders:Order[];
  paidOrders:Order[];
  pendingPaymentOrders:Order[];
  products: any[] = [];

  constructor(private orderService:OrderService, private productsService:ProductsService) {
  }

  ngOnInit(): void {
    this.initData();
  }

  initData(){
    this.orderService.myOrders().subscribe({
      next:(response)=>{
        this.paidOrders = response.filter(order => order.status === 'PAID');
        this.pendingPaymentOrders = response.filter(order => order.status === 'UNPAID' || order.status === 'PAYMENT_PENDING');
        console.log(this.paidOrders);
      }
    })
    this.productsService.all().subscribe((result)=>{
      this.products = result;
    });
  }


}
