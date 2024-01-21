import {Expose, Type} from "class-transformer";

export interface ItemSummary{
    id:string,
    name:string
    price:number
}

export class OrderItem {

  quantity:number;
  item:ItemSummary;
}
