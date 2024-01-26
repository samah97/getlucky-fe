import {AddressRequest} from "../core/interfaces/address-request";

export interface Address{
    billingAddress:AddressRequest,
    shippingAddress:AddressRequest
}
