import {
  Component,
  OnInit,
} from '@angular/core';
import { debounceTime } from 'rxjs/operators';

// Ck Editer
import * as Editor from 'ckeditor5/build/ckeditor';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProductService } from 'src/app/services/HttpClient/productService/product.service';
import { ProductDto } from 'src/app/models/dtos/product/ProductDto';
import { CkEditorConfigService } from 'src/app/services/Html/CKEditor5/ck-editor-config.service';
import { ProductCategoryService } from 'src/app/services/HttpClient/productCategoryService/product-category.service';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})

/**
 * AddProduct Component - Ürün henüz yok; kategori product-category state'inden gelir.
 * ProductDto kullanılır; varyant için mainCategoryId/categoryId ProductCategoryService.state'ten alınır.
 */
export class AddProductComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  public Editor = Editor;
  /** Add-product'ta ürün yok, taslak ProductDto ile çalışılır. */
  public productDto: ProductDto | null = null;

  _productForm: FormGroup;

  /** Varyant alanı: taslak dolduruldu (Oluştur tıklandı) ve product-category'den kategori seçili. */
  get categoryAndProductReady(): boolean {
    const state = this.productCategoryService.state;
    console.log("Kontrol", this.productDto, state.mainCategoryId)
    if(this.productDto && state.mainCategoryId > 0)
      return true;

    console.log("False geldi")
    return false;
  }

  constructor(
    private productService: ProductService,
    public productCategoryService: ProductCategoryService,
    private formBuilder: FormBuilder,
    public ckEditorConfigService: CkEditorConfigService
  ) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Ecommerce' },
      { label: 'Create Product', active: true },
    ];
    this.productCategoryService.reset();
    this.productForm();
  }

  productForm() {
    this._productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      description: ['', Validators.required],
      productCode: ['', Validators.required]
    });

    this._productForm.valueChanges.pipe(debounceTime(300)).subscribe(() => {
      if (this.productDto) {
        this.productDto = {
          ...this.productDto,
          productName: this._productForm.value.productName,
          description: this._productForm.value.description,
          productCode: this._productForm.value.productCode,
          categoryId: this.productDto.categoryId ?? [],
        };
        this.emitProductForVariant();
      }
    });
  }

  /** Taslak oluştur; kategori product-category state'inden alınır. Servise Product + state merge edilir. */
  productFill() {
    const cat = this.productCategoryService.state;
    this.productDto = {
      productId: 0,
      productName: this._productForm.value.productName,
      description: this._productForm.value.description,
      productCode: this._productForm.value.productCode,
      categoryId: Array.isArray(cat?.categoryId) ? cat.categoryId : [],
    };
    this.emitProductForVariant();
  }

  /** add-product-variant için products$ + kategori state'i tek kaynak: ProductCategoryService.state kullanılır. */
  private emitProductForVariant(): void {
    if (!this.productDto) return;
    const cat = this.productCategoryService.state;
    this.productService.products$.next({
      id: this.productDto.productId,
      productName: this.productDto.productName,
      description: this.productDto.description,
      productCode: this.productDto.productCode,
      ...cat,
    } as any);
  }

  /**
   * Multiple Default Select2
   */
  selectValue = ['Choice 1', 'Choice 2', 'Choice 3'];


  files: File[] = [];

  onSelect(event: any) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

}
