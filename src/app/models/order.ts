import {OrderItem} from "./order-item";

export class Order {

    items:OrderItem[];
    createdAt:string;
    status:string;
    price:number
    constructor(
        public id:string
    ){}
}
