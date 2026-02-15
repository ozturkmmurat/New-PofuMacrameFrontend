/** Backend ProductCategory: MainCategoryId > 0 = ana kategori, CategoryId > 0 = yan kategori (IsMainCategory yok) */
export interface ProductCategory {
  id: number;
  productId: number;
  mainCategoryId: number;
  categoryId: number;
}
