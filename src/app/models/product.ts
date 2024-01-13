export class Product {

    biddingPrice: number;
    description: string;
    imageLink: string;
    drawScheduledAt: string;

    constructor(
        public id: string,
        public name: string,
    ) { }
}
