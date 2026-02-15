import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { SelectListProductVariantDto } from 'src/app/models/dtos/product/select/selectListProductVariantDto';
import { FilterProduct } from 'src/app/models/entityParameter/product/filterProduct';
import { ProductService } from 'src/app/services/HttpClient/productService/product.service';
import { UserService } from 'src/app/services/HttpClient/userService/user.service';
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
  filterProduct : FilterProduct = {
    categoryId:0, attributes:[], startLength:0, endLength:7
  }
  //Model Parameter End

  //Variable Start
  imageFolderUrl :string
  //Variable End

  /** Günün Ürünleri: 4 görünür, ok + noktalarla kaydırma, en fazla 12 ürün (3 sayfa) */
  dayProductsSlickConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    draggable: true,
    infinite: false,
    arrows: true,
    dots: true,
    margin: 12,
    prevArrow: '<button type="button" class="slick-prev day-products-arrow day-products-prev"><i class="ri-arrow-left-s-line"></i></button>',
    nextArrow: '<button type="button" class="slick-next day-products-arrow day-products-next"><i class="ri-arrow-right-s-line"></i></button>',
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 3, margin: 12, arrows: true, dots: true } },
      { breakpoint: 576, settings: { slidesToShow: 2, margin: 10, arrows: true, dots: true } }
    ]
  };

  constructor(
    private productService : ProductService,
    private cdr: ChangeDetectorRef,
    private userService : UserService
  ) {
    this.imageFolderUrl = environment.imageFolderUrl
  }

  ngOnInit() {
    this.getAllProductVariantDto()
  }

  getAllProductVariantDto(){
    this.productService.getAllProductVariantDtoPv(this.filterProduct).subscribe(response => {
      this.productVariants = [...response.data];
      console.log(response.data)
      this.cdr.markForCheck()
    })
  }

}