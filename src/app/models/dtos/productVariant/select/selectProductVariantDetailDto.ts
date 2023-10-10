export interface SelectProductVariantDetailDto{
    productVariantId:number,
    productId:number,
    attributeId:number,
    attributeValueId:number,
    parentId:number,
    attributeKey:string,
    attributeValue:string,
    productPaths:string[]
}