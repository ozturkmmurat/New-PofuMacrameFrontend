export interface SelectCategoryDto {
    Id: number,
    parentId?: number
    categoryName: string,
    subCategories: SelectCategoryDto[]
}