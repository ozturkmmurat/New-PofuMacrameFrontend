import { FilterAttribute } from "../attribute/filterAttribute";

export interface FilterProduct{
    categoryId: number;
    startLength: number;
    endLength: number;
    minPrice: number;
    maxPrice: number;
    attributes: FilterAttribute[]
}