/** API için: ana kategori (mainCategoryId) + yan kategoriler (categoryId listesi). Backend ProductCategory satırlarına dönüştürülür. */
export interface ProductCategoryDto {
  productCategoryId: number;
  productId: number;
  mainCategoryId: number;
  categoryId: number[];
}
