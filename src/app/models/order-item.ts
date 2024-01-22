
export interface ItemSummary{
    id:string,
    name:string
    biddingPrice:number,
    imageLink:string
}

export class OrderItem {
    quantity: number;
    item: ItemSummary;
}
