import { CartItem } from "../../html/cart/cartItem"

export interface TsaPaymentParameter {
    addressId: number
    productPriceFactorId: number
    tcNo: string
    orderDescription: string
    cartItems: CartItem[] | null
}
