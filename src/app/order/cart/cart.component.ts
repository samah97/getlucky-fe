import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../core/services/order.service";
import {AppConfig} from "../../core/config/app-config";
import {CartService} from "../../core/services/cart.service";
import {Router} from "@angular/router";
import {OrderItem} from "../../models/order-item";
import {Order} from "../../models/order";
import {OrderRequest} from "../../core/interfaces/order-request";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
    order:Order;
    currency = AppConfig.CURRENCY;
    orderId:string = "12381923-1238129813-123891238-1238192";
    orderItems:OrderItem[];

    constructor(private orderService:OrderService, private  cartService:CartService,private router:Router) {
    }

    ngOnInit(): void {
        this.initData();
    }

    initData(){
        // this.addDumyItems();
        this.cartService.getCartItems().subscribe({
            next:(response)=>{
                this.order = response;
                this.orderItems = response.items;
            }
        })
    }
    performCheckout(){
        if(this.orderId){
            try{
                this.orderService.checkoutAndRedirect(this.orderId);
            }catch (error){
                console.log("ERRRO CAUGHT");
            }

        }
    }

    // getTotalPrice() {
    //     return  this.items.reduce((total, orderItem) => {
    //         return total + (orderItem.quantity * orderItem.);
    //     }, 0);
    // }

    navigateProducts() {
        this.router.navigate(['/products/list'])
    }

    protected readonly JSON = JSON;

    quantityChange(id: string, event:any) {
        const newQuantity = parseInt((event.target as HTMLInputElement).value);
        let orderItem = this.orderItems.find(orderItem=> orderItem.item.id === id)!;
        orderItem.quantity = newQuantity;
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
}
