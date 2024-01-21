import {OrderItemRequest} from "./order-item-request";
import {AddressRequest} from "./address-request";

export interface UpdateCartRequest {
  orderItems: { [key: string]: OrderItemRequest };
  billingAddress:AddressRequest | null | undefined;
  shippingAddress:AddressRequest | null| undefined;
}
