export interface SelectProductStockDto{
    productStockId:number,
    productId:number,
    firstProductVariantId:number
    endProductVariantId:number,
    parentId:number,
    attributeId:number,
    attributeValueId:number,
    quantity:number,
    price:number,
    stockCode:string,
    attributeValue:string
}