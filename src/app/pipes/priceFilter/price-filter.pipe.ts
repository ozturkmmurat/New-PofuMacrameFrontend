import { Pipe, PipeTransform } from '@angular/core';
import { SelectListProductVariantDto } from 'src/app/models/dtos/product/select/selectListProductVariantDto';

@Pipe({
  name: 'priceFilter'
})
export class PriceFilterPipe implements PipeTransform {

  transform(products: SelectListProductVariantDto[], minPrice: number, maxPrice: number): SelectListProductVariantDto[] {
    return products.filter(product => {
      const price = product.netPrice;
      return (!minPrice || price >= minPrice) && (!maxPrice || price <= maxPrice);
    });
  }
}
