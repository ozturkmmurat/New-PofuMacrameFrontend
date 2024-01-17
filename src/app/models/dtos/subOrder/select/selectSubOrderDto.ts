export interface SelectSubOrderDto{
    subOrderId:number,
    variantId:number,
    parentId:number,
    productName:string,
    attribute:string
    imagePath:string,
    price:number,
    kdv:number,
    netPrice:number
    subOrderStatus:number
}