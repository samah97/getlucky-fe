import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../core/services/order.service";
import {AppConfig} from "../../core/config/app-config";
import {CartService} from "../../core/services/cart.service";
import {Router} from "@angular/router";
import {Order} from "../../models/order";
import {OrderRequest} from "../../core/interfaces/order-request";
import {OrderItemRequest} from "../../core/interfaces/order-item-request";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
    order:Order;
    currency = AppConfig.CURRENCY;
    orderId:string = "12381923-1238129813-123891238-1238192";
    orderItems:{ [key: string]: OrderItemRequest } = {};
    currentStep: string = 'cart';

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
                this.fillOrderItems(response);
            }
        })
    }
    proceedToCheckout(){
        if(this.orderId){
            if(this.cartItemsUpdated()){
                console.log("Some items where updated;;;calling API");
                this.cartService.updateCart(this.buildUpdateCartRequest()).subscribe({
                    next:()=> this.continueCheckoutProcess()
                });
            }else{
                this.continueCheckoutProcess();
            }

            // try{
            //     this.orderService.checkoutAndRedirect(this.orderId);
            // }catch (error){
            //     console.log("ERRRO CAUGHT");
            // }

        }
    }

    private continueCheckoutProcess() {
        this.currentStep = 'profile';
        console.log("Proceeding with checkout");
    }


    navigateProducts() {
        this.router.navigate(['/products/list'])
    }


    quantityChange(id: string, event:any) {
        let newQuantity = parseInt((event.target as HTMLInputElement).value);
        // let orderItem = this.orderItems.find(orderItem=> orderItem.item.id === id)!;
        // orderItem.quantity = newQuantity;
        let orderItemQ = this.orderItems[id];

        orderItemQ.quantity = newQuantity;
        console.log(this.orderItems);
        console.log(this.order.items);
    }

    buildUpdateCartRequest(): OrderRequest {
        return {
            orderItems: this.orderItems,
            shippingAddress: null,
            billingAddress: null,
        };
    }

    private cartItemsUpdated() {
        let cartItemUpdateExists=false;
        this.order.items.forEach(orderItem=>{
            console.log(" IS  "+this.orderItems[orderItem.item.id].quantity+" == "+orderItem.quantity);
            if(this.orderItems[orderItem.item.id].quantity !== orderItem.quantity){
                cartItemUpdateExists = true;
                return;
            }
        })
        return cartItemUpdateExists;
    }

    fillOrderItems(order:Order){
        order.items.forEach(orderItem=>{
            this.orderItems[orderItem.item.id] = {
                quantity:orderItem.quantity
            }
        }) ;
    }

    async profileSavedEventHandler(){
        console.log("Handled Profile saved in Cart");
        this.currentStep = 'address'
    }
}
