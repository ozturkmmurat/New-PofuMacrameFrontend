import { AttributeValue } from "src/app/models/attributeValue/attributeValue"



export interface ViewCategoryAttributeDto{
    categoryId:number,
    attributeId:number,
    attributeName:string,
    attributeValues:Array<AttributeValue>
    slicer:boolean,
    attribute:boolean
}