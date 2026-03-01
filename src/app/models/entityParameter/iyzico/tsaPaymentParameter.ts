import { CartItem } from "../../html/cart/cartItem"

export interface TsaPaymentParameter {
    addressId: number
    productPriceFactorId: number
    tcNo: string
    orderDescription: string
    cartItems: CartItem[] | null

    /** Siparişin istenen teslimat başlangıç zamanı */
    requestedDeliveryStart?: Date

    /** Siparişin istenen teslimat bitiş zamanı */
    requestedDeliveryEnd?: Date

    fullName: string
    email: string
    phone: string
    recipientPhone: string
    address: string
    city: string
    postCode: string
}
