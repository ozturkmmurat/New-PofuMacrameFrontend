import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// Products Services
import * as Editor from 'ckeditor5/build/ckeditor';

import { ProductService } from 'src/app/services/HttpClient/productService/product.service';
import { Product } from 'src/app/models/product/product';
import {
  ProductCategoryService,
  ProductCategoryHttpService,
} from 'src/app/services/HttpClient/productCategoryService/product-category.service';
import { ViewCategoryAttributeDto } from 'src/app/models/dtos/categoryAttribute/select/ViewCategoryAttributeDto';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductVariantService } from 'src/app/services/HttpClient/productVariantService/productVariant.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EMPTY, Observable, catchError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { GlobalComponent } from 'src/app/global-component';
import { ProductVariant } from 'src/app/models/productVariant/productVariant';
import { SelectProductStockDto } from 'src/app/models/dtos/productStock/select/SelectProductStockDto';
import { ProductStockService } from 'src/app/services/HttpClient/productStockService/product-stock.service';
import { ProductStock } from 'src/app/models/productStock/prodcutStock';
import { CategoryAttributeService } from 'src/app/services/HttpClient/categoryAttributeService/category-attribute.service';
import { ProductImage } from 'src/app/models/productImage/productImage';
import { CkEditorConfigService } from 'src/app/services/Html/CKEditor5/ck-editor-config.service';
import { ErrorService } from 'src/app/services/Helper/errorService/error.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
/**
 * ProductDetail Component
 */
export class ProductDetailComponent implements OnInit {
  
  public Editor = Editor;
  // bread crumb items

  breadCrumbItems!: Array<{}>;

  //Global Variable
  imageUrl = GlobalComponent.IMAGE_URL;

  //Model Start
  product: Product;
  /** Kategori yüklenip products$ güncellendi; varyant formu bu durumda doğru açılsın diye kullanılır */
  categoryAndProductReady = false;
  viewCategoryAttributeDto: ViewCategoryAttributeDto[] = [];
  productStocks$ : Observable<SelectProductStockDto[]>;
  productVariant : ProductVariant
  //Form Start
  _productForm : FormGroup;

  //Input
  productImage: ProductImage;
  productStock:ProductStock
  form: FormData[] = [];
  formData : FormData = new FormData();

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private productCategoryHttp: ProductCategoryHttpService,
    private productVariantService : ProductVariantService,
    private categoryAttributeService : CategoryAttributeService,
    private productStockService : ProductStockService,
    private errorService : ErrorService,
    private formBuilder : FormBuilder,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    public ckEditorConfigService : CkEditorConfigService
  ) {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Ecommerce' },
      { label: 'Product Details', active: true },
    ];
    this.activatedRoute.params.subscribe((params) => {
      if (params['productId']) {
        this.getByProduct(params['productId']);
        this.getAllStock(params['productId']);
      }
    });
  }

  productForm() {
    const cat = this.productCategoryService.state;
    this._productForm = this.formBuilder.group({
      id: [this.product.id, Validators.required],
      productName: [this.product.productName, Validators.required],
      description: [this.product.description, Validators.required],
      productCode: [this.product.productCode, Validators.required]
    });
    this.productService.products$.next({ ...this.product, ...cat });
  }

  getByProduct(productId: number) {
    this.productService.getBy(productId).subscribe((response) => {
      const data = response.data;
      this.product = {
        id: data.id,
        productName: data.productName,
        description: data.description,
        productCode: data.productCode
      };
      // Önce ürünün kategorisini yükle; add-product-variant doğru mainCategoryId ile form açılsın
      this.categoryAndProductReady = false;
      this.productCategoryHttp.getByProductId(productId).subscribe({
        next: (res) => {
          const list = res.data ?? [];
          const mainCategoryId = list[0]?.mainCategoryId ?? 0;
          const categoryId = list.filter((p) => (p.categoryId ?? 0) > 0).map((p) => p.categoryId);
          this.productCategoryService.setState(mainCategoryId, categoryId);
          this.productForm();
          this.categoryAndProductReady = true;
        },
        error: () => {
          this.productCategoryService.setState(0, []);
          this.productForm();
          this.categoryAndProductReady = true;
        }
      });
    });
  }

  getAllStock(productId : number){
    this.productStockService.getByAllDto(productId).subscribe(response => {
      this.productStockService.productStocks$.next(response.data)
      this.productStocks$ = this.productStockService.productStocks$
      console.log("Stock", response.data)
    })
  }

  getAllTrueAttrSlicer() {
    const mainCategoryId = this.productCategoryService.state?.mainCategoryId;
    if (!mainCategoryId) return;
    this.categoryAttributeService
      .getAllTrueSlicerAttribute(mainCategoryId)
      .subscribe((response) => {
        this.viewCategoryAttributeDto = response.data;
      });
  }

  updateProduct(){
    if(this._productForm.valid){
      const cat = this.productCategoryService.state;
      const productDtoModel = {
        productId: this._productForm.value.id,
        productName: this._productForm.value.productName,
        description: this._productForm.value.description,
        productCode: this._productForm.value.productCode,
        mainCategoryId: cat.mainCategoryId,
        categoryId: Array.isArray(cat.categoryId) ? cat.categoryId : []
      };
      this.productService.tsaUpdate(productDtoModel).pipe(
        catchError((err : HttpErrorResponse) => {
          this.errorService.checkError(err)
          return EMPTY;
        }))
        .subscribe(response => {
          this.toastrService.success(response.message, "Başarılı")
        })
    }
  }

  mappingProductVariant(productStockDto : SelectProductStockDto){
    this.productVariant = {
      id: productStockDto.firstProductVariantId, productId : productStockDto.productId, parentId:productStockDto.parentId , attributeId : productStockDto.attributeId,
      attributeValueId : productStockDto.attributeValueId
    }
    return this.productVariant
  }

  mappinProductStock(productStockDto : SelectProductStockDto){
    this.productStock = {
      id : productStockDto.productStockId, productId : productStockDto.productId, productVariantId : productStockDto.endProductVariantId,
      price : productStockDto.price, quantity : productStockDto.quantity, stockCode : productStockDto.stockCode, kdv : productStockDto.kdv, netPrice : productStockDto.netPrice
    }
    return this.productStock
  }


    @ViewChild('exlargeModal') exlargeModal: any; 

    openExtraLarge(){
      this.formData = new FormData();
      this.form = [];
      this.modalService.open(this.exlargeModal, {size:'xl', centered:true}).dismissed
    }
    @ViewChild('exlargeModalPs') exlargeModalPs: any; 

    openExtraLargePs(){
      this.modalService.open(this.exlargeModalPs, {size:'xl', centered:true}).dismissed
    }

    productImageModal(row : any){
      this.productImage = {
        id:0,
        productVariantId : row.firstProductVariantId,
        productId : row.productId,
        path : "",
        isMain:false,
      }
      this.openExtraLarge()
    }

    productStockModal(row : any){
      this.mappinProductStock(row)
      this.openExtraLargePs()
    }
 
 }