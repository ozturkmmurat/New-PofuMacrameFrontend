import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category } from 'src/app/models/category/category';
import { CategoryService } from 'src/app/services/HttpClient/categoryService/category.service';
import {
  ProductCategoryService
} from 'src/app/services/HttpClient/productCategoryService/product-category.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit, OnChanges {
  @Input() productId: number;
  @Input() mainCategoryLocked = false;
  @Output() mainCategoryIdChange = new EventEmitter<void>();

  _categoryForm: FormGroup;
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private productCategory: ProductCategoryService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.productCategoryForm();
    this.loadCategories();
  }

  /** Kategori formunu oluşturur ve değişikliklerde servise yazar. */
  private productCategoryForm(): void {
    this._categoryForm = this.formBuilder.group({
      mainCategoryId: [0],
      categoryId: [[] as number[]]
    });
    this._categoryForm.valueChanges.subscribe((v) => {
      const mainCategoryId = v.mainCategoryId ?? 0;
      const categoryId = Array.isArray(v.categoryId) ? v.categoryId : [];
      this.productCategory.setState(mainCategoryId, categoryId);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productId'] && (this.productId ?? 0) > 0) {
      this.loadProductSelections();
    }
  }

  /** 1. Önce kategorileri çek (Combobox ve Tokenbox seçenek listesi) */
  private loadCategories(): void {
    this.categoryService.getAll().subscribe((res) => (this.categories = res.data ?? []));
  }

  /** 2. İlgili ürünün MainCategory ve CategoryId'sini al; servise set et, iç formu güncelle */
  private loadProductSelections(): void {
    this.productCategory.getByProductId(this.productId).subscribe({
      next: (res) => {
        const list = res.data ?? [];
        const mainCategoryId = list[0]?.mainCategoryId ?? 0;
        const categoryId = list.filter((p) => (p.categoryId ?? 0) > 0).map((p) => p.categoryId);
        this.productCategory.setState(mainCategoryId, categoryId);
        if (this._categoryForm) {
          this._categoryForm.patchValue({ mainCategoryId, categoryId }, { emitEvent: false });
        }
      },
      error: () => {
        this.productCategory.setState(0, []);
        if (this._categoryForm) {
          this._categoryForm.patchValue({ mainCategoryId: 0, categoryId: [] }, { emitEvent: false });
        }
      }
    });
  }
}
