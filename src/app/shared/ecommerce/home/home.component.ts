import { ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import { SelectListProductVariantDto } from 'src/app/models/dtos/product/select/selectListProductVariantDto';
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
    this.productService.getAllProductVariantDtoPv().subscribe(response => {
      this.productVariants = [...response.data];
      console.log(response.data)
      this.cdr.markForCheck()
    })
  }

}