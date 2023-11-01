import { ChangeDetectorRef, Component, NgZone, QueryList, ViewChildren } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { EMPTY, Observable, catchError } from 'rxjs';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { GlobalComponent } from '../../../global-component';

// Products Services
import { restApiService } from "../../../core/services/rest-api.service";

// Range Slider
import { Options } from 'ngx-slider-v2';

// Sweet Alert
import Swal from 'sweetalert2';

import { ActivatedRoute, Router } from '@angular/router';
import { NgbdProductsSortableHeader, productSortEvent } from 'src/app/pages/ecommerce/products/products-sortable.directive';
import { productModel } from '../../../pages/ecommerce/products/products.model';
import { AdvancedService } from '../../../pages/ecommerce/products/products.service';
import { HtmlEditService } from 'src/app/services/Html/HtmlEdit/html-edit.service';
import { NavbarService } from 'src/app/services/Design/navbarService/navbar.service';
import { SelectListProductVariantDto } from 'src/app/models/dtos/product/select/selectListProductVariantDto';
import { ProductService } from 'src/app/services/HttpClient/productService/product.service';
import { environment } from 'src/environments/environment';
import { FilterCategoryAttributeDto } from 'src/app/models/dtos/categoryAttribute/filterCategoryAttributeDto';
import { CategoryAttributeService } from 'src/app/services/HttpClient/categoryAttributeService/category-attribute.service';
import { FilterProduct } from 'src/app/models/entityParameter/product/filterProduct';
import { HttpErrorResponse } from '@angular/common/http';
import { TotalFilterProduct } from 'src/app/models/entityParameter/product/totalFilterProduct';

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

  //My Variable Start
  imageFolderUrl: string
  totalProduct: number = 0
  keepTotalProduct: number = 0
  checkboxState: boolean = false

  //My Entity Parameter Start
  filterProduct: FilterProduct = {
    categoryId: 0, attributes: [], startLength: 0, endLength: 20
  }

  //My Pipe Variable Start  
  minPrice: number = 0;
  maxPrice: number = 1000;
  filterText = "";
  startLengthState = false
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  url = GlobalComponent.API_URL;

  constructor(private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: UntypedFormBuilder,
    public restApiService: restApiService,
    private productService: ProductService,
    private categoryAttributeService: CategoryAttributeService
  ) {
    this.imageFolderUrl = environment.imageFolderUrl
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['categoryId'])
        this.filterProduct.categoryId = Number(params['categoryId'])
      this.getTotalProduct(Number(params['categoryId'])).then(() => {
        this.getAllProductVariantDto();
        this.getAllFilterCategoryAttribute(Number(params['categoryId']));
      })
    })
  }

  options: Options = {
    floor: 0,
    ceil: 1000
  };

  /**
   * Default Select2
   */
  multiDefaultOption = 'Watches';
  selectedAccount = 'This is a placeholder';
  Default = [
    { name: 'Watches' },
    { name: 'Headset' },
    { name: 'Sweatshirt' },
  ];

  // Check Box Checked Value Get
  checkedValGet: any[] = [];
  // Select Checkbox value Get
  onCheckboxChange(e: any) {
    var checkboxes: any = document.getElementsByName('checkAll');
    var checkedVal: any[] = [];
    var result
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        result = checkboxes[i].value;
        checkedVal.push(result);
      }
    }
    this.checkedValGet = checkedVal
    var checkBoxCount: any = document.getElementById('select-content') as HTMLElement;
    checkBoxCount.innerHTML = checkedVal.length;
    checkedVal.length > 0 ? (document.getElementById("selection-element") as HTMLElement).style.display = "block" : (document.getElementById("selection-element") as HTMLElement).style.display = "none";
  }

  clearall(ev: any) {
    var checkboxes: any = document.getElementsByName('checkAll');
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false
    }
    this.filterProduct.attributes = []
    this.productVariants = this.keepProductVariants
  }

  getAllProductVariantDto() {
    this.checkStartEndLength()
    this.productService.getAllProductVariantDtoPv(this.filterProduct).subscribe(response => {
      this.startLengthState = true
      this.productVariants = [...this.productVariants, ...response.data];
      if (this.filterProduct.startLength < this.totalProduct) {
        this.filterProduct.startLength = this.filterProduct.endLength
      }
    })
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