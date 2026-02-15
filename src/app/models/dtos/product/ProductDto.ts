/** TsaUpdate endpoint'i için; ana kategori değiştirilmez, sadece ek kategoriler gönderilir. */
export interface ProductDto {
  productId: number;
  productName: string;
  description: string;
  productCode: string;
  categoryId: number[];
}
