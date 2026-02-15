import { ProductVariantAttributeValueDto } from "../../dtos/productVariant/select/productVarianAttributeValueDto";

export class CartItem {
  product: ProductVariantAttributeValueDto;
  quantity: number;
}