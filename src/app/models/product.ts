export class Product {

    biddingPrice?:number;
    description?:String;
    imageLink?:String;
    endTime?:number;

    constructor(
        public id:string,
        public name:string,
    ){}
}
