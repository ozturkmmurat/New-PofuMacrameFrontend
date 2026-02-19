import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { CategoryDto } from 'src/app/models/dtos/category/CategoryDto';
import { SelectListProductVariantDto } from 'src/app/models/dtos/product/select/selectListProductVariantDto';
import { FilterCategory } from 'src/app/models/entityParameter/category/filterCategory';
import { FilterProduct } from 'src/app/models/entityParameter/product/filterProduct';
import { CategoryService } from 'src/app/services/HttpClient/categoryService/category.service';
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
  secondaryPhotoUrl: string;
  productVariants: SelectListProductVariantDto[] = []
  theDayProducts: SelectListProductVariantDto[] = []
  randomCategories: CategoryDto[] = []
  //Model End

  //Model Parameter Start
  filterProduct: FilterProduct = {
    categoryId: 0, attributes: [], startLength: 0, endLength: 20, minPrice: 0, maxPrice: 0
  }
  filterCategory: FilterCategory = { startLength: 0, endLength: 12 }
  //Model Parameter End

  //Variable Start
  imageFolderUrl: string
  //Variable End

  /** Günün Ürünleri: 4 görünür, ok + noktalarla kaydırma, en fazla 12 ürün (3 sayfa) */
  dayProductsSlickConfig = {
    slidesToShow: 4,
    slidesToScroll: 2,
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

  categorySlickConfig = {
    slidesToShow: 4,
    slidesToScroll: 2,
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
    private productService: ProductService,
    private categoryService: CategoryService,
    private cdr: ChangeDetectorRef,
    private userService: UserService
  ) {
    this.imageFolderUrl = environment.imageFolderUrl
  }

  ngOnInit() {
    this.getAllProductVariantDto();
    this.categoryService.getAllRandomCategory(this.filterCategory).subscribe(response => {
      this.randomCategories = response.data ?? [];
      this.cdr.markForCheck();
    });
  }

  getAllProductVariantDto() {
    this.productService.getAllProductVariantDtoPv(this.filterProduct).subscribe(response => {
      const middle = Math.ceil(response.data.length / 2);
      this.productVariants = response.data.slice(0, middle);
      this.theDayProducts = response.data.slice(middle);

      this.cdr.markForCheck()
    })
  }
}