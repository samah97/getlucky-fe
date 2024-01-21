
export interface ItemSummary{
    id:string,
    name:string
    price:number,
    imageLink:string
}

export class OrderItem {
    quantity: number;
    item: ItemSummary;
}
