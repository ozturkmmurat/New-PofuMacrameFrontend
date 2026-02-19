import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable, catchError, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { AttributeValue } from 'src/app/models/attributeValue/attributeValue';
import { CategoryAttributeDto } from 'src/app/models/dtos/categoryAttribute/categoryAttributeDto';
import { ViewCategoryAttributeDto } from 'src/app/models/dtos/categoryAttribute/select/ViewCategoryAttributeDto';
import { Category } from 'src/app/models/category/category';
import { ProductAttribute } from 'src/app/models/productAttribute/productAttribute';
import { Product } from 'src/app/models/product/product';
import { ErrorService } from 'src/app/services/Helper/errorService/error.service';
import { CategoryAttributeService } from 'src/app/services/HttpClient/categoryAttributeService/category-attribute.service';
import { CategoryService } from 'src/app/services/HttpClient/categoryService/category.service';
import { ProductAttributeService } from 'src/app/services/HttpClient/productAttributeService/product-attribute.service';
import { ProductService } from 'src/app/services/HttpClient/productService/product.service';
import { ProductStockService } from 'src/app/services/HttpClient/productStockService/product-stock.service';
import { ProductCategoryService, ProductCategoryState } from 'src/app/services/HttpClient/productCategoryService/product-category.service';

@Component({
  selector: 'app-add-product-variant',
  templateUrl: './add-product-variant.component.html',
  styleUrls: ['./add-product-variant.component.scss'],
})
export class AddProductVariantComponent {
  _productVariantForm: FormGroup;

  // Kartezyen çarpım (varyant kombinasyonları)
  selectedValues: { [key: string]: AttributeValue[] } = {};
  cartesianProduct: any[] = [];
  /** Ürün productService'ten, kategori ProductCategoryService state'inden gelir. */
  product$: Observable<Product & ProductCategoryState> = combineLatest([
    this.productService.products$,
    this.productCategoryService.getState$()
  ]).pipe(
    map(([product, category]) => ({
      ...product,
      mainCategoryId: category.mainCategoryId,
      categoryId: category.categoryId
    }))
  );
  // Değişkenler
  selectedAttributeValues: { [attributeValue: string]: AttributeValue[] } = {};
  jsonData: any = {};
  disableInput: boolean = true;

  /** Kategori değişince güncellenir; Fiyat/KDV alan sayısı bu listeye göre. */
  effectiveViewCategoryAttributeDto: ViewCategoryAttributeDto[] = [];
  /** Ana kategori + ek kategoriler listesi. */
  categories: Category[] = [];

  categoryAttributes: CategoryAttributeDto[] = [];
  private lastTokenboxCategoryKey = '';

  constructor(
    private productService: ProductService,
    private productStockService: ProductStockService,
    private productCategoryService: ProductCategoryService,
    private errorService: ErrorService,
    private formBuilder: FormBuilder,
    private categoryAttributeService: CategoryAttributeService,
    private categoryService: CategoryService,
    private productAttributeService: ProductAttributeService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.productVariantForm();
  }

  loadCategories(): void {
    this.categoryService.getAll().subscribe((res) => {
      this.categories = res.data ?? [];
    });
  }

  updateKdvAmount(index: number) {
    const control = this.productStocksArray.controls[index];
    const selectedKdv = +control.get('kdv')?.value || 0;
    const price = +control.get('price')?.value || 0;
    const kdvAmount = (price * selectedKdv) / 100;
    const netPrice = price + kdvAmount;
    control.get('kdvAmount')?.setValue(kdvAmount);
    control.get('netPrice')?.setValue(netPrice);
  }

  productVariantForm() {
    this.product$.subscribe((product) => {
      // ProductDetail: ürün + kategori API'den. Add-product: kategori sadece product-category state'inden.
      const mainCategoryId = product?.mainCategoryId ?? this.productCategoryService.state?.mainCategoryId ?? 0;
      const categoryId = product?.categoryId ?? this.productCategoryService.state?.categoryId ?? [];
      if (!product?.productName && product?.id === undefined) return;

      if (this._productVariantForm) {
        const prevMain = this._productVariantForm.get('mainCategoryId')?.value;
        const prevCat = this._productVariantForm.get('categoryId')?.value;
        const categoryChanged =
          prevMain !== mainCategoryId ||
          JSON.stringify(prevCat || []) !== JSON.stringify(categoryId || []);
        this._productVariantForm.patchValue({
          productId: product.id,
          mainCategoryId,
          categoryId,
          productName: product.productName,
          description: product.description,
          productCode: product.productCode,
        });
        this.productCategoryService.setState(mainCategoryId, categoryId);
        if (prevMain !== mainCategoryId) {
          this.resetVariantAndStockForNewCategory();
          this.loadAttributesForCategory(mainCategoryId);
        }
        if (categoryChanged) {
          this.loadCategoryAttributesForTokenbox(mainCategoryId, categoryId);
        }
        return;
      }

      this._productVariantForm = this.formBuilder.group({
        productId: [product.id],
        mainCategoryId: [mainCategoryId, Validators.required],
        categoryId: [categoryId],
        productName: [product.productName, Validators.required],
        description: [product.description, Validators.required],
        productCode: [product.productCode, Validators.required],
        productVariants: this.formBuilder.array([]),
        productStocks: this.formBuilder.array([
          this.formBuilder.group({
            price: new FormControl(0),
            quantity: new FormControl(0),
            kdv: [Number(1), Validators.required],
            kdvAmount: [0, Validators.required],
            netPrice: [0, Validators.required],
            stockCode: [''],
          }),
        ]),
        jsonData: [this.jsonData, Validators.required],
        isVariant: [false, Validators.required],
        selectedCategoryAttributes: [[] as CategoryAttributeDto[]],
      });
      this.syncFormCategoryToService();
      this.loadAttributesForCategory(mainCategoryId);
      if (product.id === 0) {
        this.loadCategoryAttributesForTokenbox(mainCategoryId, categoryId);
      }
    });
  }

  /** Formdaki kategori değişince ProductCategoryService güncellenir; product$ buna göre emit eder. */
  private syncFormCategoryToService(): void {
    const mainCtrl = this._productVariantForm.get('mainCategoryId');
    const catCtrl = this._productVariantForm.get('categoryId');
    if (!mainCtrl || !catCtrl) return;
    const update = () => {
      const mainId = +(mainCtrl.value ?? 0);
      const catIds = Array.isArray(catCtrl.value) ? catCtrl.value : [];
      this.productCategoryService.setState(mainId, catIds);
    };
    update();
    mainCtrl.valueChanges.subscribe(() => update());
    catCtrl.valueChanges.subscribe(() => update());
  }

  /** Verilen kategoriye ait varyant attribute listesini yükler (alan sayısı bu listeye göre). */
  loadAttributesForCategory(categoryId: number): void {
    if (!categoryId) {
      this.effectiveViewCategoryAttributeDto = [];
      return;
    }
    this.categoryAttributeService
      .getAllTrueSlicerAttribute(categoryId)
      .subscribe((response) => {
        this.effectiveViewCategoryAttributeDto = response.data || [];
      });
  }

  private getUniqueCategoryIds(mainCategoryId: number, categoryId: number[]): number[] {
    const ids = [
      ...(mainCategoryId > 0 ? [mainCategoryId] : []),
      ...(Array.isArray(categoryId) ? categoryId.filter((id) => (id ?? 0) > 0) : []),
    ];
    return [...new Set(ids)];
  }

  private setCategoryAttributesFromResponse(data: any[]): void {
    this.categoryAttributes = (data ?? []).map((item: any) => ({
      categoryId: item.categoryId ?? [],
      attributeId: item.attributeId,
      attributeValueId: item.attributeValueId,
      attributeValue: item.attributeValue,
    }));
  }

  getCategoryAttributes(categoryIds: number[]): void {
    this.productAttributeService
      .getAllProductAttribute({
        categoryId: categoryIds,
        attributeId: 0,
        attributeValueId: 0,
        attributeValue: '',
        productId: 0,
        productName: '',
        attributeName: '',
      })
      .subscribe({
        next: (response) => this.setCategoryAttributesFromResponse(response.data ?? []),
        error: () => (this.categoryAttributes = []),
      });
  }

  loadCategoryAttributesForTokenbox(mainCategoryId: number, categoryId: number[]): void {
    const uniqueIds = this.getUniqueCategoryIds(mainCategoryId, categoryId);

    if (uniqueIds.length === 0) {
      this.categoryAttributes = [];
      this.lastTokenboxCategoryKey = '';
      return;
    }

    const key = uniqueIds.slice().sort((a, b) => a - b).join(',');
    if (key === this.lastTokenboxCategoryKey) return;

    this.lastTokenboxCategoryKey = key;
    this.getCategoryAttributes(uniqueIds);
  }

  get productStocksArray() {
    return this._productVariantForm.controls['productStocks'] as FormArray;
  }

  getAllTrueAttrSlicer() {
    const mainCategoryId = this._productVariantForm?.value?.mainCategoryId ?? this.productCategoryService.state?.mainCategoryId ?? 0;
    if (!mainCategoryId) return;
    this.categoryAttributeService
      .getAllTrueSlicerAttribute(mainCategoryId)
      .subscribe((response) => {
        this.isVariantFalse();
        this.effectiveViewCategoryAttributeDto = response.data || [];
      });
  }

  isVariantFalse(){
    if(!this._productVariantForm.value.isVariant){
      this.productStocksArray.clear()
      this.cartesianProduct.splice(0, this.cartesianProduct.length)
      this.jsonData = {}
      this._productVariantForm.get('jsonData').setValue({})
      const productStock = this.formBuilder.group({
        price:new FormControl(0),
        quantity:new FormControl(0),
        kdv:[Number(1), Validators.required],
        kdvAmount:[0, Validators.required],
        netPrice:[0, Validators.required],
        stockCode:['']
      })
      this.productStocksArray.push(productStock)
    }
  }

  /** Kategori değiştiğinde varyant/stok alanlarını sıfırlar; Fiyat/KDV alan sayısı yeni kategoriye göre 1 satıra iner. */
  resetVariantAndStockForNewCategory(): void {
    this.selectedValues = {};
    this.cartesianProduct.splice(0, this.cartesianProduct.length);
    this.jsonData = {};
    this._productVariantForm.get('jsonData')?.setValue(this.jsonData);
    this._productVariantForm.patchValue({ isVariant: false });
    this.productStocksArray.clear();
    this.productStocksArray.push(
      this.formBuilder.group({
        price: new FormControl(0),
        quantity: new FormControl(0),
        kdv: [Number(1), Validators.required],
        kdvAmount: [0, Validators.required],
        netPrice: [0, Validators.required],
        stockCode: [''],
      })
    );
    this.effectiveViewCategoryAttributeDto = [];
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
        kdv: [Number(1), Validators.required],
        kdvAmount: [0, Validators.required],
        netPrice: [0, Validators.required],
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
    const key = index.toString();
    this.removeJsonDataArray(index)
    this.productStocksArray.removeAt(index);
    this.cartesianProduct.splice(index, 1);
  }

  addProductVariant() {
    if (this._productVariantForm.valid) {
      const raw = this._productVariantForm.value;
      const productAttributes = this.buildProductAttributes(raw);
      const productModel = {
        ...raw,
        categoryId: Array.isArray(raw.categoryId) ? raw.categoryId : [],
        productAttributes,
      };
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
          this.resetVariantFormAfterSubmit();
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

  /** Ürünü Oluştur başarılı olduktan sonra varyant kartları ve buton temizlenir; kullanıcı tekrar "Varyant Oluştur" basmalı. */
  resetVariantFormAfterSubmit(): void {
    this.cartesianProduct.splice(0, this.cartesianProduct.length);
    this.jsonData = {};
    this._productVariantForm.get('jsonData')?.setValue(this.jsonData);
    this._productVariantForm.get('selectedCategoryAttributes')?.setValue([]);
    this.productStocksArray.clear();
    this.productStocksArray.push(
      this.formBuilder.group({
        price: new FormControl(0),
        quantity: new FormControl(0),
        kdv: [Number(1), Validators.required],
        kdvAmount: [0, Validators.required],
        netPrice: [0, Validators.required],
        stockCode: [''],
      })
    );
  }

  private buildProductAttributes(raw: any): ProductAttribute[] {
    const productId = raw.productId ?? 0;
    const set = new Set<string>();
    const result: ProductAttribute[] = [];

    const push = (attributeId: number, attributeValueId: number) => {
      const key = `${attributeId}-${attributeValueId}`;
      if (set.has(key)) return;
      set.add(key);
      result.push({ id: 0, productId, attributeId, attributeValueId });
    };

    const jsonData = raw.jsonData;
    if (jsonData && typeof jsonData === 'object') {
      Object.keys(jsonData).forEach((key) => {
        const arr = jsonData[key];
        if (Array.isArray(arr)) {
          arr.forEach((item: Record<number, number>) => {
            Object.entries(item).forEach(([attrId, attrValId]) => {
              push(Number(attrId), Number(attrValId));
            });
          });
        }
      });
    }

    const selectedCategoryAttributes = raw.selectedCategoryAttributes as CategoryAttributeDto[];
    if (Array.isArray(selectedCategoryAttributes)) {
      selectedCategoryAttributes.forEach((item) => {
        push(item.attributeId, item.attributeValueId);
      });
    }

    return result;
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