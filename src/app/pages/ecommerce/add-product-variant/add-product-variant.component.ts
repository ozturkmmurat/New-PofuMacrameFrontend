import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable, catchError } from 'rxjs';
import { AttributeValue } from 'src/app/models/attributeValue/attributeValue';
import { ViewCategoryAttributeDto } from 'src/app/models/dtos/categoryAttribute/select/ViewCategoryAttributeDto';
import { Product } from 'src/app/models/product/product';
import { ErrorService } from 'src/app/services/Helper/error.service';
import { CategoryAttributeService } from 'src/app/services/HttpClient/categoryAttributeService/category-attribute.service';
import { ProductService } from 'src/app/services/HttpClient/productService/product.service';
import { ProductStockService } from 'src/app/services/HttpClient/productStockService/product-stock.service';
import { ProductVariantService } from 'src/app/services/HttpClient/productVariantService/productVariant.service';

@Component({
  selector: 'app-add-product-variant',
  templateUrl: './add-product-variant.component.html',
  styleUrls: ['./add-product-variant.component.scss'],
})
export class AddProductVariantComponent {
  _productVariantForm: FormGroup;

  //Cartesian
  selectedValues: { [key: string]: AttributeValue[] } = {};
  cartesianProduct: any[] = [];
  product$: Observable<Product> = this.productService.products$;
  //Variables
  selectedAttributeValues: { [attributeValue: string]: AttributeValue[] } = {};
  jsonData: any = {};

  //@Input() product: Product;
  @Input() viewCategoryAttributeDto: ViewCategoryAttributeDto[] = [];
  constructor(
    private productService: ProductService,
    private productStockService: ProductStockService,
    private errorService: ErrorService,
    private formBuilder: FormBuilder,
    private categoryAttributeService: CategoryAttributeService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    if (this.productService.products$) {
      this.productVariantForm();
      this.product$ = this.productService.products$;
    }
  }

  productVariantForm() {
    this.product$.subscribe((product) => {
      console.log('Gelen id', product.categoryId);
      this._productVariantForm = this.formBuilder.group({
        productId: [product.id],
        categoryId: [product.categoryId, Validators.required],
        productName: [product.productName, Validators.required], // productName alanı için zorunluluk doğrulama kuralı eklendi
        description: [product.description, Validators.required],
        productVariants: this.formBuilder.array([]),
        productStocks: this.formBuilder.array([
          this.formBuilder.group({
            price: new FormControl(0),
            quantity: new FormControl(0),
            stockCode: [''],
          }),
        ]),
        jsonData: [this.jsonData, Validators.required],
        isVariant: [false, Validators.required],
      });
    });
  }

  get productStocksArray() {
    return this._productVariantForm.controls['productStocks'] as FormArray;
  }

  getAllTrueAttrSlicer() {
    this.product$.subscribe((response) => {
      console.log('Response data kontrol', response.categoryId);
      this.categoryAttributeService
        .getAllTrueSlicerAttribute(response.categoryId)
        .subscribe((response) => {
          console.log('Response data', response.data);
          this.viewCategoryAttributeDto = response.data;
        });
    });
  }

  onSelectionChange(
    attributeName: string,
    selectedValues: AttributeValue[]
  ): void {
    this.selectedValues[attributeName] = selectedValues;
  }

  createVariant(): void {
    const jsonLength = Object.keys(this.jsonData).length;
    for (let index = 0; index < jsonLength; index++) {
      delete this.jsonData[index];
    }
    this.productStocksArray.clear();
    this.cartesianProduct.splice(0, this.cartesianProduct.length);

    if (this._productVariantForm.value.isVariant == true) {
      this.productStocksArray.clear();
      this.cartesianProduct = this.calculateCartesianProduct();
      this.createProductFormArray(this.cartesianProduct.length);
      this.generateFormattedData();
    } else if (this._productVariantForm.value.isVariant == false) {
      this.createProductFormArray(1);
    }
  }

  calculateCartesianProduct(): any[] {
    const keys = Object.keys(this.selectedValues);
    if (keys.length === 0) {
      return [];
    }

    const result: any[] = [];
    const productHelper = (
      currentProduct: any[],
      remainingKeys: string[]
    ): void => {
      if (remainingKeys.length === 0) {
        result.push(currentProduct);
        return;
      }

      const currentKey = remainingKeys[0];
      const selectedAttributeValues = this.selectedValues[currentKey];

      for (const attributeValue of selectedAttributeValues) {
        const newProduct = [
          ...currentProduct,
          {
            attribute: currentKey,
            attributeId: attributeValue.attributeId,
            id: attributeValue.id,
            value: attributeValue.value,
          },
        ];
        productHelper(newProduct, remainingKeys.slice(1));
      }
    };

    productHelper([], keys);
    return result;
  }

  createProductFormArray(length: number) {
    for (let index = 0; index < length; index++) {
      const productStocksGroup = this.formBuilder.group({
        price: new FormControl(0, Validators.required),
        quantity: new FormControl(0, Validators.required),
        stockCode: ['', Validators.required],
      });
      this.productStocksArray.push(productStocksGroup);
    }
  }

  generateFormattedData(): any {
    const cartesianProduct = this.calculateCartesianProduct();

    cartesianProduct.forEach((product, index) => {
      const key = index;
      this.jsonData[key] = [];

      product.forEach((attributeValue: AttributeValue) => {
        const attributeId = attributeValue.attributeId;
        const id = attributeValue.id;
        this.jsonData[key].push({ [attributeId]: id });
      });
    });
  }

  async removeVariantHtml(index: number) {
    console.log('Gelen index numarası', index);
    const key = index.toString(); // İndeks değerini bir dizeye çevirin.
   this.removeJsonDataArray(index)
    this.productStocksArray.removeAt(index);
    this.cartesianProduct.splice(index, 1);
    console.log('Cartesian product', this.cartesianProduct);
    console.log('Stok', this.productStocksArray);
    console.log('Json data', this.jsonData);
  }

  addProductVariant() {
    console.log(this._productVariantForm);
    console.log(this._productVariantForm.value);
    if (this._productVariantForm.valid) {
      let productModel = Object.assign({}, this._productVariantForm.value);
      this.productService
        .tsaAdd(productModel)
        .pipe(
          catchError((err: HttpErrorResponse) => {
            this.errorService.checkError(err);
            return EMPTY;
          })
        )
        .subscribe((response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.refreshProductStock(this.productService.products$.value.id);
        });
    } else {
      this.toastrService.error('Formu eksiksiz doldurun.');
    }
  }

  refreshProductStock(productId: number) {
    this.productStockService.getByAllDto(productId).subscribe((response) => {
      this.productStockService.productStocks$.next(response.data);
    });
  }

   removeJsonDataArray(index: number) {
    if (this.jsonData.hasOwnProperty(index)) {
      delete this.jsonData[index];
      const jsonDataKey = Object.keys(this.jsonData);
      const newKey: { [key: number]: any } = {};     
      jsonDataKey.forEach((key, index) => {
        newKey[index] = this.jsonData[key];
      });
      this.jsonData = newKey;
      this._productVariantForm.get('jsonData')?.patchValue(this.jsonData)
    }
  }
}
