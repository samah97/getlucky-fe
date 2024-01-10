export enum OrderStatus {
  PAID = 'Paid',
  PAYMENT_PENDING = 'Payment Pending',
  UNPAID = 'Unpaid'
}

// Add colors as associated properties
export const StatusClasses: { [key in OrderStatus]: string } = {
  [OrderStatus.PAID]: 'status-paid',
  [OrderStatus.PAYMENT_PENDING]: 'status-payment-pending',
  [OrderStatus.UNPAID]: 'status-unpaid',
};
