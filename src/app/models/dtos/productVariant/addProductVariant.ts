import { ProductAttribute } from "../../productAttribute/productAttribute";
import { ProductStock } from "../../productStock/prodcutStock";
import { ProductVariant } from "../../productVariant/productVariant";

export interface AddProductVariant {
  productId: number;
  mainCategoryId: number;
  categoryId: number[];
  productName: string;
  description: string;
  productCode: string;
  productVariants: ProductVariant[];
  productStocks: ProductStock[];
  productAttributes: ProductAttribute[];
  jsonData: any;
  isVariant: boolean;
}