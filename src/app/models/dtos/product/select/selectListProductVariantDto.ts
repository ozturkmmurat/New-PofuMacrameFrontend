import { AttributeValue } from "src/app/models/attributeValue/attributeValue"

export interface SelectListProductVariantDto{
    productId:number,
    productVariantId:number,
    productName:string,
    description:string,
    attributeValue: AttributeValue[],
    stockCode:string,
    productPaths:string[],
    price:number
    quantity:number
}