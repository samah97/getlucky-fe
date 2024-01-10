import { Pipe, PipeTransform } from '@angular/core';
import {OrderStatus, StatusClasses} from "../enums/order-status";

@Pipe({
  standalone: true,
  name: 'orderStatusTransform'
})
export class OrderStatusTransformPipe implements PipeTransform {


  transform(status:string, prop: string): string {
    let displayValue = '';
    let styleClassName = '';
    const enumKey = status as keyof typeof OrderStatus
    // orderStatus = this.getDisplayValueForKey()
    // console.log(status);
    // switch (status) {
    //   case 'PAID':
    //     displayValue = 'Order Paid';
    //     styleClassName = 'status-paid';
    //     break;
    //   case 'PAYMENT_PENDING':
    //     displayValue = 'Pending';
    //     styleClassName = 'status-pending';
    //     break;
    //   // Add more cases for other statuses if needed
    //   default:
    //     displayValue = '';
    //     styleClassName = 'status-default';
    //     break;
    // }
    if (prop === 'displayValue') {
      return OrderStatus[enumKey]??'';
    } else if (prop === 'styleClassName') {
      return StatusClasses[OrderStatus[enumKey]];
    } else {
      return '';
    }
  }


}
