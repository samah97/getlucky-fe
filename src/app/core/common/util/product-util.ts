import {Product} from "../../../models/product";
import {LefttimeCalculator} from "./lefttime-calculator";

export class ProductUtil {

    public static shouldShowProduct(product:Product):boolean{
        return (product.available ?? false) && this.timeLeftAvailable(product.drawScheduledAt);
    }

    private static timeLeftAvailable(drawScheduledAt?:string):boolean{
        if(drawScheduledAt){
            return LefttimeCalculator.calculate(drawScheduledAt) > 0;
        }
        return false;
    }


}
