import { CartItem } from "../../html/cart/cartItem"

export interface TsaPaymentParameter{
    addressId:number
    tcNo:string
    cartItems:CartItem[]
}