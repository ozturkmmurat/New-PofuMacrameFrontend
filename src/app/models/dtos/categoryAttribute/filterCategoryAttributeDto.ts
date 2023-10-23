import { AttributeValue } from "../../attributeValue/attributeValue";

export interface FilterCategoryAttributeDto{
   attributeId:number,
   categoryName:string,
   attributeName:string,
   attributeValues:AttributeValue[]
}