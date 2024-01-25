import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../core/services/order.service";
import {AppConfig} from "../../core/config/app-config";
import {CartService} from "../../core/services/cart.service";
import {Router} from "@angular/router";
import {Order} from "../../models/order";
import {OrderRequest} from "../../core/interfaces/order-request";
import {OrderItemRequest} from "../../core/interfaces/order-item-request";
import {UserService} from "../../core/services/user.service";
import {API_ERROR_CODES} from "../../core/enums/api-error-codes";
import {ErrorResponse} from "../../models/error-response";

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
    totalPrice:number;

    constructor(private userService:UserService,
                private  cartService:CartService,
                private router:Router) {
    }

    ngOnInit(): void {
        this.initData();
    }


    initData(){
        console.log(this.currentStep);
        // this.addDumyItems();
        this.cartService.getCartItems().subscribe({
            next:(response)=>{
                this.order = response;
                this.totalPrice = this.order.price;
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
        }
    }

    private continueCheckoutProcess() {
        this.userService.checkProfileStatus().subscribe({
            next:()=>{
                this.currentStep = 'address';
            },
            error:(error:ErrorResponse)=>{
                if(error.code === API_ERROR_CODES.invalid_profile){
                    this.currentStep = 'profile';
                }
            }
        })

    }


    navigateProducts() {
        this.router.navigate(['/products/list'])
    }


    quantityChange(id: string, newQuantity:any) {
        let orderItemQ = this.orderItems[id];
        orderItemQ.quantity = newQuantity;
        this.updateTotalPrice();
    }

    private updateTotalPrice() {

        let priceSum=0;
        this.order.items.forEach(orderItem=>{
            priceSum += this.orderItems[orderItem.item.id].quantity * orderItem.item.biddingPrice;
        });
        this.totalPrice = priceSum;
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
        this.currentStep = 'address'
    }

    cartNotEmpty() {
        return this.order && this.order.items && this.order.items.length >0;
    }
}
