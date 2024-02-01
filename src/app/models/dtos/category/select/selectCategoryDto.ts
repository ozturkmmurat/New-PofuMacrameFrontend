export interface SelectCategoryDto {
    id: number,
    parentId?: number
    categoryName: string,
    subCategories: SelectCategoryDto[]
}