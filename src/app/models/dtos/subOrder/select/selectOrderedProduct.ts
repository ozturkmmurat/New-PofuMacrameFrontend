export interface SelectOrderedProductDto{
    orderId:number,
    variantId:number,
    parentId:number,
    userId:number,
    orderDate:Date,
    orderCode:string
    productName:string,
    attribute:string
    imagePath:string,
    price:number,
    subOrderStatus:number
}