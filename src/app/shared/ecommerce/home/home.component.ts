import { ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import { SelectListProductVariantDto } from 'src/app/models/dtos/product/select/selectListProductVariantDto';
import { FilterProduct } from 'src/app/models/entityParameter/product/filterProduct';
import { ProductService } from 'src/app/services/HttpClient/productService/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  //Model Start
  secondaryPhotoUrl : string;
  productVariants : SelectListProductVariantDto [] = []
  //Model End

  //Model Parameter Start
  filterProduct : FilterProduct
  //Model Parameter End

  //Variable Start
  imageFolderUrl :string
  //Variable End

  constructor(
    private productService : ProductService,
    private cdr: ChangeDetectorRef
  ) {
    this.imageFolderUrl = environment.imageFolderUrl
  }

  ngOnInit() {
    this.getAllProductVariantDto()
  }

  getAllProductVariantDto(){
    this.filterProduct = {
      attributes : [], categoryId : 0
    }
    this.productService.getAllProductVariantDtoPv(this.filterProduct).subscribe(response => {
      this.productVariants = [...response.data];
      console.log(response.data)
      this.cdr.markForCheck()
    })
  }

}