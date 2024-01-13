import { Pipe, PipeTransform } from '@angular/core';
import { OrderStatus, StatusClasses } from "../enums/order-status";

@Pipe({
  standalone: true,
  name: 'orderStatusTransform'
})
export class OrderStatusTransformPipe implements PipeTransform {

  transform(status: string, prop: string): string {
    const displayValue = '';
    const styleClassName = '';
    const enumKey = status as keyof typeof OrderStatus
    if (prop === 'displayValue') {
      return OrderStatus[enumKey] ?? '';
    } else if (prop === 'styleClassName') {
      return StatusClasses[OrderStatus[enumKey]];
    } else {
      return '';
    }
  }
}
