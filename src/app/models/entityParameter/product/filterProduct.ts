import { FilterAttribute } from "../attribute/filterAttribute";

export interface FilterProduct{
    categoryId: number;
    startLength: number;
    endLength: number;
    attributes: FilterAttribute[]
}