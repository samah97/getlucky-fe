import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../core/services/order.service";
import {AppConfig} from "../../core/config/app-config";
import {CartService} from "../../core/services/cart.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
    items: any[] = [];
    currency = AppConfig.CURRENCY;
    orderId:string = "12381923-1238129813-123891238-1238192";
    constructor(private orderService:OrderService, private  cartService:CartService,private router:Router) {
    }

    ngOnInit(): void {
        this.initData();
    }

    initData(){
        // this.addDumyItems();
        this.cartService.getCartItems().subscribe({
            next:(response)=>{
                this.orderId = response.id;
                this.items = response.items;
            }
        })
    }
    addDumyItems(){
        this.items.push({
                name:'PS5',
                biddingPrice:10,
                quantity:1
            },
            {
                name:'FIFA',
                biddingPrice:100,
                quantity:1
            });
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

    getTotalPrice() {
        return  this.items.reduce((total, orderItem) => {
            return total + (orderItem.quantity * orderItem.biddingPrice);
        }, 0);
    }

    navigateProducts() {
        this.router.navigate(['/products/list'])
    }
}
