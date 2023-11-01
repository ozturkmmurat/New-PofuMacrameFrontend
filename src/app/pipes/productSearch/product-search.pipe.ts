import { Pipe, PipeTransform } from '@angular/core';
import { SelectListProductVariantDto } from 'src/app/models/dtos/product/select/selectListProductVariantDto';

@Pipe({
  name: 'productSearch'
})
export class ProductSearchPipe implements PipeTransform {

  transform(value: SelectListProductVariantDto[], filterText : string): SelectListProductVariantDto[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : ""
    return filterText ? value
    .filter((x : SelectListProductVariantDto) => x.productName.toLocaleLowerCase().indexOf(filterText) !== -1) : value;
  }

}
