export interface Product {

    id:string,
    name:string,
    biddingPrice?: number,
    available?:boolean
    description?: string,
    imageLink?: string,
    drawScheduledAt?: string,
    // constructor(
    //     public id: string,
    //     public name: string,
    // ) { }
}
