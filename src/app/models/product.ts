export class Product {

    biddingPrice?:number;
    description?:String;
    imageLink?:String;
    drawScheduledAt?:string;

    constructor(
        public id:string,
        public name:string,
    ){}
}
