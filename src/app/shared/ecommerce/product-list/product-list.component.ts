import { ChangeDetectorRef, Component, NgZone, QueryList, ViewChildren } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { GlobalComponent } from '../../../global-component';

// Products Services
import { restApiService } from "../../../core/services/rest-api.service";

// Range Slider
import { Options } from 'ngx-slider-v2';

// Sweet Alert
import Swal from 'sweetalert2';

import { ActivatedRoute, Router } from '@angular/router';
import { AdvancedService } from '../../../pages/ecommerce/products/products.service';
import { SelectListProductVariantDto } from 'src/app/models/dtos/product/select/selectListProductVariantDto';
import { ProductService } from 'src/app/services/HttpClient/productService/product.service';
import { environment } from 'src/environments/environment';
import { FilterCategoryAttributeDto } from 'src/app/models/dtos/categoryAttribute/filterCategoryAttributeDto';
import { CategoryAttributeService } from 'src/app/services/HttpClient/categoryAttributeService/category-attribute.service';
import { FilterProduct } from 'src/app/models/entityParameter/product/filterProduct';
import { CategoryService } from 'src/app/services/HttpClient/categoryService/category.service';
import { Category } from 'src/app/models/category/category';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [AdvancedService, DecimalPipe]
})
export class ProductListComponent {


  //Model Start
  productVariants: SelectListProductVariantDto[] = []
  keepProductVariants: SelectListProductVariantDto[] = []
  categoryAttributes: FilterCategoryAttributeDto[] = []
  categories : Category[] = []

  //My Variable Start
  imageFolderUrl: string
  totalProduct: number = 0
  keepTotalProduct: number = 0
  checkboxState: boolean = false

  //My Entity Parameter Start
  filterProduct: FilterProduct = {
    categoryId: 0, attributes: [], startLength: 0, endLength: 20
  }

  //My Pipe Variable Start (filtre uygulandığında pipe bunları kullanır)
  minPrice: number = 0;
  maxPrice: number = 1000;
  // Slider/input'ta gösterilen değerler (sadece Filtreleri Uygula'da minPrice/maxPrice'a kopyalanır)
  sliderMinPrice: number = 0;
  sliderMaxPrice: number = 1000;
  filterText = "";
  startLengthState = false
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  url = GlobalComponent.API_URL;

  constructor(private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    public restApiService: restApiService,
    private productService: ProductService,
    private categoryAttributeService: CategoryAttributeService,
    private categoryService : CategoryService
  ) {
    this.imageFolderUrl = environment.imageFolderUrl
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['categoryId'])
      this.filterProduct.categoryId = Number(params['categoryId'])
      this.productVariants = []
      this.getTotalProduct(Number(params['categoryId'])).then(() => {
        this.getAllProductVariantDto();
        this.getAllFilterCategoryAttribute(Number(params['categoryId']));
        this.getAllSubCategory(Number(params['categoryId']))
      })
    })
  }

  options: Options = {
    floor: 0,
    ceil: 1000
  };

  clearall(ev: any) {
    var checkboxes: any = document.getElementsByName('checkAll');
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false
    }
    this.filterProduct.attributes = []
    this.productVariants = this.keepProductVariants
    this.updateSliderRangeFromProducts()
  }

  getAllProductVariantDto() {
    this.checkStartEndLength()
    this.productService.getAllProductVariantDtoPv(this.filterProduct).subscribe(response => {
      console.log("Gelen data ürün", response.data)
      this.startLengthState = true
      this.productVariants = [...this.productVariants, ...response.data];
      if (this.filterProduct.startLength < this.totalProduct) {
        this.filterProduct.startLength = this.filterProduct.endLength
      }
      this.updateSliderRangeFromProducts()
    })
  }

  /** productVariants içindeki en düşük ve en yüksek netPrice'a göre slider aralığını günceller */
  updateSliderRangeFromProducts() {
    if (!this.productVariants?.length) {
      this.options = { floor: 0, ceil: 1000 }
      this.sliderMinPrice = 0
      this.sliderMaxPrice = 1000
      this.minPrice = 0
      this.maxPrice = 1000
      return
    }
    const prices = this.productVariants.map(p => Number(p.netPrice)).filter(n => !isNaN(n))
    const minVal = prices.length ? Math.floor(Math.min(...prices)) : 0
    const maxVal = prices.length ? Math.ceil(Math.max(...prices)) : 1000
    const floor = minVal
    const ceil = maxVal > minVal ? maxVal : minVal + 1
    this.options = { floor, ceil }
    this.sliderMinPrice = floor
    this.sliderMaxPrice = ceil
    this.minPrice = floor
    this.maxPrice = ceil
  }

  getAllFilterCategoryAttribute(categoryId: number) {
    console.log("CategoryId", categoryId)
    this.categoryAttributeService.getAllCategoryAttributeFilter(categoryId).subscribe(response => {
      this.categoryAttributes = response.data
    })
  }

  getTotalProduct(categoryId: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.productService.getTotalProduct(categoryId).subscribe(response => {
        this.totalProduct = Number(response.data);
        resolve(this.totalProduct);
      }, error => {
        reject(error);
      });
    });
  }

  getAllSubCategory(categoryId : number){
    this.categoryService.getAllSubCategory(categoryId).subscribe(response => {
      this.categories = response.data
    })
  }

  selectAttribute(attributeId: number, attributeValueId: number, event: any) {
    let attribute = this.filterProduct.attributes.find(x => x.id === attributeId)
    if (this.checkboxState == false) {
      this.keepProductVariants = this.productVariants
      this.checkboxState = true
    }
    if (event.target.checked) {
      if (!attribute) {
        this.filterProduct.attributes.push({
          id: attributeId,
          valueId: [attributeValueId]
        })
      } else {
        attribute.valueId.push(attributeValueId)
      }
    } else if (!event.target.checked) {
      if (this.filterProduct.attributes.length > 0) {
        let index = this.filterProduct.attributes.findIndex(x => x.id == attributeId)
        if (index !== -1 && this.filterProduct.attributes[index].valueId.length > 0) {
          let valueIndex = this.filterProduct.attributes[index].valueId.findIndex(x => x == attributeValueId)
          if (valueIndex !== -1) {
            this.filterProduct.attributes[index].valueId.splice(valueIndex, 1)
            if (index !== -1 && this.filterProduct.attributes[index].valueId.length == 0) {
              this.filterProduct.attributes.splice(index, 1)
            }
          }
        }
      }
      if (this.filterProduct.attributes.length == 0 && this.checkboxState == true) {
        this.productVariants = this.keepProductVariants
      }
    }
  }


  applyFilter() {
    this.minPrice = this.sliderMinPrice
    this.maxPrice = this.sliderMaxPrice
    if (this.filterProduct.attributes.length > 0) {
      console.log("Service gidecek olan filterProduct", this.filterProduct)
      this.productVariants = []
      this.getAllProductVariantDto()
    }
  }

  checkStartEndLength() {
    if (this.filterProduct.startLength > this.totalProduct) {
      this.filterProduct.endLength -= this.totalProduct
    } else if (this.filterProduct.endLength > this.totalProduct) {
      this.filterProduct.endLength = this.totalProduct
    }
  }
}