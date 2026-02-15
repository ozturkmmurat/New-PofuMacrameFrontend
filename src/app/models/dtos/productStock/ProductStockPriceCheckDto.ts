/** Backend CheckProductStockPrice ile uyumlu: ProductVariantId (List), ProductPriceFactorId */
export interface ProductStockPriceCheckDto {
  productVariantId: number[];
  productPriceFactorId: number;
}
