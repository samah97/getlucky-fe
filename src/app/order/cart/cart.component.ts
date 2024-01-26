import {Component, OnInit, Renderer2} from '@angular/core';
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
import {ConfirmationService, MenuItem} from "primeng/api";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Address} from "../../models/Address";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
    animations: [
        trigger('rowAnimation', [
            state('in', style({ opacity: 1, height: '*' })),
            transition(':enter', [
                style({ opacity: 0, height: 0 }),
                animate('0.3s ease-out', style({ opacity: 1, height: '*' })),
            ]),
            transition(':leave', [
                style({ opacity: 1, height: '*' }),
                animate('0.3s ease-in', style({ opacity: 0, height: 0 })),
            ]),
        ]),
    ],
})
export class CartComponent implements OnInit{
    order:Order;
    currency = AppConfig.CURRENCY;
    orderItems:{ [key: string]: OrderItemRequest } = {};
    currentStep: number = 0;
    totalPrice:number;
    currentNbrOfCartItems:number =0;
    userHasValidProfile=false;
    steps:MenuItem[] = [];
    profileStepIndex = -1;
    addressStepIndex = -1;

    constructor(private userService:UserService,
                private  cartService:CartService,
                private router:Router,
                private confirmationService:ConfirmationService,
                private orderService:OrderService
                ) {
    }

    ngOnInit(): void {
        this.initData();
    }


    initData(){
        this.checkUserHasValidProfile();
        this.cartService.getCartItems().subscribe({
            next:(response)=>{
                this.order = response;
                this.totalPrice = this.order.price;
                this.fillOrderItems(response);
            }
        })
    }
    proceedToCheckout(){
        if(this.currentNbrOfCartItems > 0){
            this.currentStep++;
            // this.continueCheckoutProcess();
            // if(this.cartItemsUpdated()){
            //     console.log("Some items where updated;;;calling API");
            //     this.cartService.updateCart(this.buildUpdateCartRequest()).subscribe({
            //         next:()=> this.continueCheckoutProcess()
            //     });
            // }else{
            //     this.continueCheckoutProcess();
            // }
        }
    }

    // private continueCheckoutProcess() {
    //     if(this.userHasValidProfile){
    //         this.currentStep =2;
    //     }else{
    //         this.currentStep = 1
    //     }
    // }
    async profileSavedEventHandler(){
        this.currentStep++;
        this.userHasValidProfile = true;
    }

    private checkUserHasValidProfile(){
        this.userService.checkProfileStatus().subscribe({
            next:()=>{
                this.createStepsItems(true);
                this.userHasValidProfile = true;
                // this.currentStep = 'address';
            },
            error:(error:ErrorResponse)=>{
                if(error.code === API_ERROR_CODES.invalid_profile){
                    // this.currentStep = 'profile';
                    this.createStepsItems(false);
                    this.userHasValidProfile = false;
                }
            }
        })
    }



    navigateProducts() {
        this.router.navigate(['/products/list'])
    }

    quantityChange(id: string, newQuantity:number) {
        this.updateItemQuantity(id,newQuantity)
    }

    private updateTotalPrice() {
        let priceSum=0;
        this.order.items.forEach(orderItem=>{
            priceSum += this.orderItems[orderItem.item.id].quantity * orderItem.item.biddingPrice;
        });
        this.totalPrice = priceSum;
    }

    buildUpdateCartRequest(address: Address): OrderRequest {
        return {
            orderItems: this.orderItems,
            shippingAddress: address.billingAddress,
            billingAddress: address.billingAddress,
        };
    }

    // private cartItemsUpdated() {
    //     let cartItemUpdateExists=false;
    //     this.order.items.forEach(orderItem=>{
    //         if(this.orderItems[orderItem.item.id].quantity !== orderItem.quantity){
    //             cartItemUpdateExists = true;
    //             return;
    //         }
    //     })
    //     return cartItemUpdateExists;
    // }

    fillOrderItems(order:Order){
        order.items.forEach(orderItem=>{
            this.orderItems[orderItem.item.id] = {
                quantity:orderItem.quantity
            }
        }) ;
        this.currentNbrOfCartItems = this.order.items.length;
    }



    confirmCartItem(id: string,$event:any) {
        this.confirmationService.confirm({
            message:'Are you sure you want to remove item from cart?',
            acceptButtonStyleClass:'btn-danger',
            rejectButtonStyleClass:'btn-secondary',
            accept: ()=>this.deleteCartItem(id)
        })
    }
    deleteCartItem(id: string) {
        console.log("setting Cart Item qty to 0");
        this.updateItemQuantity(id,0);
        this.currentNbrOfCartItems--;
    }

    updateItemQuantity(itemId: string,newQuantity:number){
        let orderItemQ = this.orderItems[itemId];
        orderItemQ.quantity = newQuantity;
        console.log(orderItemQ);
        this.updateTotalPrice();
    }

    handleAddressFormSubmitted(formData: any) {
        console.log("Form Data Received in Cart");
        console.log(formData);
    }

    createStepsItems(hasValidProfile:boolean){
        let stepsIndex = 0;
        this.steps = [];
        this.steps.push({label:'Cart'});
        if(!hasValidProfile){
            this.profileStepIndex = 1;
            this.addressStepIndex = 2;
            this.steps.push({label:'Profile'});
        }else{
            this.addressStepIndex = 1;
        }
        this.steps.push({label:'Address'});
        this.steps.push({label:'Checkout'});
    }

    goBackOneStep() {
        if(this.currentStep > 0){
            this.currentStep--;
        }
    }

    addressFormSubmitted(address: Address) {
        let orderRequest = this.buildUpdateCartRequest(address);
        this.cartService.updateCart(orderRequest).subscribe({
            next:()=> this.orderService.checkoutAndRedirect(this.order.id)
        });
    }
}
