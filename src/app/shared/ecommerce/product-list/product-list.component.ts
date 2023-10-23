import { Component, QueryList, ViewChildren } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { NgbModal, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { GlobalComponent } from '../../../global-component';

// Products Services
import { restApiService } from "../../../core/services/rest-api.service";

// Range Slider
import { Options } from 'ngx-slider-v2';

// Sweet Alert
import Swal from 'sweetalert2';

import { Router } from '@angular/router';
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

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [AdvancedService, DecimalPipe]
})
export class ProductListComponent {


  //Model Start
  productVariants: SelectListProductVariantDto[] = []
  categoryAttributes: FilterCategoryAttributeDto[] = []

  //My Variable Start
  imageFolderUrl: string
  checkAttributeValueIdList : number[] = []

  //My Entity Parameter Start
  filterProduct : FilterProduct
  
  //My Pipe Variable Start  
  minPrice:number=0;
  maxPrice:number=1000;
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  

  url = GlobalComponent.API_URL;
  content!: productModel[];
  products!: any;
  user: any = [];
  Brand: any = [];
  Rating: any = [];
  discountRates: number[] = [];
  contactsForm!: UntypedFormGroup;
  total: any;
  totalbrand: any;
  totalrate: any;
  totaldiscount: any;
  allproduct: any;

  allproducts: any;
  activeindex = '1';
  allpublish: any;
  grocery: any = 0;
  fashion: any = 0;
  watches: any = 0;
  electronics: any = 0;
  furniture: any = 0;
  accessories: any = 0;
  appliance: any = 0;
  kids: any = 0;
  totalpublish: any = 0;

  // Table data
  productList!: Observable<productModel[]>;
  allproductList!: Observable<productModel[]>;
  total$: Observable<number>;
  @ViewChildren(NgbdProductsSortableHeader) headers!: QueryList<NgbdProductsSortableHeader>;
  searchproducts: any;
  publishedproduct: any;

  constructor(private modalService: NgbModal,
    private router: Router,
    public service: AdvancedService,
    private formBuilder: UntypedFormBuilder,
    public restApiService: restApiService,
    private productService: ProductService,
    private categoryAttributeService: CategoryAttributeService) {
    this.productList = service.countries$;
    this.allproductList = service.allproduct$;
    this.total$ = service.total$;
    this.imageFolderUrl = environment.imageFolderUrl
  }

  ngOnInit(): void {
    this.getAllProductVariantDto()
    this.getAllFilterCategoryAttribute(9)
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
    // this.service.searchTerm = ''
    this.totalbrand = 0;
    this.totaldiscount = 0;
    this.totalrate = 0;
    this.Brand = []
    this.Rating = []
    this.discountRates = []
    const iconItems = document.querySelectorAll('.filter-list');
    iconItems.forEach((item: any) => {
      var el = item.querySelectorAll('a')
      el.forEach((item: any) => {
        item.classList.remove("active");
      })
    });
    this.service.searchTerm = '';
    this.service.ProductFilter = '';
    this.service.productRate = 0;
    this.service.productPrice = 0;
  }

  getAllProductVariantDto() {
    this.filterProduct = {
      attributes : this.checkAttributeValueIdList, categoryId : 9
    }
    this.productService.getAllProductVariantDtoPv(this.filterProduct).subscribe(response => {
      this.productVariants = response.data
      console.log(response.data)
    })
  }

  getAllFilterCategoryAttribute(categoryId: number) {
    this.categoryAttributeService.getAllCategoryAttributeFilter(categoryId).subscribe(response => {
      this.categoryAttributes = response.data
    })
  }

  checkboxChange(attributeValueId:number, event:any){
    console.log("Event", event)
    if(event.target.checked){
      this.checkAttributeValueIdList.push(attributeValueId)
      this.getAllProductVariantDto()
      console.log("Liste",this.checkAttributeValueIdList)
    }else if(!event.target.checked){
      let index = this.checkAttributeValueIdList.indexOf(attributeValueId)
      if( index !== -1){
        this.checkAttributeValueIdList.splice(index,1)
        this.getAllProductVariantDto()
        console.log("Liste silindi",this.checkAttributeValueIdList)
      }
    }
  }
}