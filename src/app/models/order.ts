import {OrderItem} from "./order-item";

export class Order {

    items:OrderItem[];
    createdAt:string;
    status:string;
    constructor(
        public id:string
    ){}
}
