import { ChangeDetectorRef, Component, NgZone, QueryList, ViewChildren } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { GlobalComponent } from '../../../global-component';

// Products Services
import { restApiService } from "../../../core/services/rest-api.service";

// Sweet Alert
import Swal from 'sweetalert2';

import { ActivatedRoute, Router } from '@angular/router';
import { AdvancedService } from '../../../pages/ecommerce/products/products.service';
import { SelectListProductVariantDto } from 'src/app/models/dtos/product/select/selectListProductVariantDto';
import { ProductService } from 'src/app/services/HttpClient/productService/product.service';
import { environment } from 'src/environments/environment';
import { ProductAttributeFilterDto } from 'src/app/models/dtos/productAttribute/productAttributeFilterDto';
import { ProductAttributeService } from 'src/app/services/HttpClient/productAttributeService/product-attribute.service';
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
  categoryAttributes: ProductAttributeFilterDto[] = []
  categories : Category[] = []

  //My Variable Start
  imageFolderUrl: string
  totalProduct: number = 0
  checkboxState: boolean = false

  //My Entity Parameter Start
  private readonly pageSize = 10;
  filterProduct: FilterProduct = {
    categoryId: 0, attributes: [], startLength: 0, endLength: 10, minPrice: 0, maxPrice: 0
  }

  minPrice: number = 0;
  maxPrice: number = 0;
  filterText = "";
  startLengthState = false;
  private isInitialLoad = true;
  /** Filtreleri Uygula sonrası sadece Maksimum Tutar güncellenir */
  private onlyUpdateMaxAfterApply = false;

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  url = GlobalComponent.API_URL;

  constructor(private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    public restApiService: restApiService,
    private productService: ProductService,
    private productAttributeService: ProductAttributeService,
    private categoryService: CategoryService
  ) {
    this.imageFolderUrl = environment.imageFolderUrl
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['categoryId'])
        this.filterProduct.categoryId = Number(params['categoryId']);
      this.productVariants = [];
      this.filterProduct.startLength = 0;
      this.filterProduct.endLength = this.pageSize;
      this.isInitialLoad = true;
      this.getAllProductVariantDto();
      this.getAllSubCategory(Number(params['categoryId']));
    });
  }

  clearall(ev: any) {
    var checkboxes: any = document.getElementsByName('checkAll');
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false
    }
    this.filterProduct.attributes = []
    this.productVariants = this.keepProductVariants;
    this.updateSliderRangeFromProducts(false);
  }

  getAllProductVariantDto() {
    this.checkStartEndLength();
    this.productService.getAllProductVariantDtoPv(this.filterProduct).subscribe(response => {
      this.startLengthState = true;
      this.productVariants = [...this.productVariants, ...response.data];
      const first = response.data?.[0];
      if (first != null && first.totalProduct != null) {
        this.totalProduct = first.totalProduct;
      }
      this.filterProduct.startLength = this.productVariants.length;
      this.filterProduct.endLength = this.pageSize;
      this.updateSliderRangeFromProducts(false, this.isInitialLoad || this.onlyUpdateMaxAfterApply);
      this.isInitialLoad = false;
      this.onlyUpdateMaxAfterApply = false;
      this.loadFilterAttributes();
    });
  }

  /** updateOnlyMax true ise sadece Maksimum Tutar, listedeki en yüksek fiyata göre güncellenir (açılış + Filtreleri Uygula). */
  updateSliderRangeFromProducts(_unused = false, updateOnlyMax = false) {
    if (!this.productVariants?.length) {
      this.minPrice = 0;
      this.maxPrice = 1000;
      return;
    }
    if (!updateOnlyMax) return;
    const prices = this.productVariants.map(p => Number(p.netPrice)).filter(n => !isNaN(n));
    this.maxPrice = prices.length ? Math.ceil(Math.max(...prices)) : 0;
  }

  loadFilterAttributes() {
    if (!this.productVariants?.length) return;
    const productIds = [...new Set(this.productVariants.map(v => v.productId))];
    this.productAttributeService.getFilterByProductIds(productIds).subscribe(r => {
      this.categoryAttributes = r.data ?? [];
    });
  }

  isAttributeValueSelected(attributeId: number, valueId: number): boolean {
    const attr = this.filterProduct.attributes?.find(a => a.id === attributeId);
    return !!attr?.valueId?.includes(valueId);
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
    this.filterProduct.minPrice = this.minPrice;
    this.filterProduct.maxPrice = this.maxPrice;
    this.productVariants = [];
    this.filterProduct.startLength = 0;
    this.filterProduct.endLength = this.pageSize;
    this.onlyUpdateMaxAfterApply = true;
    this.getAllProductVariantDto();
  }

  checkStartEndLength() {
    if (this.totalProduct <= 0) return;
    if (this.filterProduct.startLength >= this.totalProduct) {
      this.filterProduct.startLength = this.totalProduct;
    }
  }
}