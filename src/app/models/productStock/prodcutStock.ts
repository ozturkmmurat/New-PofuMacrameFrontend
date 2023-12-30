export interface ProductStock{
    id:number,
    productId:number,
    productVariantId:number
    quantity:number,
    price:number
    kdv:number,
    kdvAmount:number,
    netPrice:number
    stockCode:string
}