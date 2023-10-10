import { ProductVariantAttributeValueDto } from "./productVarianAttributeValueDto"

export interface ProductVariantGroupDetailDto{
    parentId:number,
    attributeId:number,
    attributeName:string,
    productPaths:string[],
    productVariantAttributeValueDtos: ProductVariantAttributeValueDto[]
}