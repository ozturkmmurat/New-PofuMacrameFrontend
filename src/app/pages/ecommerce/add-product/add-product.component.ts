import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';

// Ck Editer
import * as Editor from 'ckeditor5/build/ckeditor';

import {
  DropzoneConfigInterface,
  DropzoneComponent,
  DropzoneDirective,
} from 'ngx-dropzone-wrapper';
import { ViewCategoryAttributeDto } from 'src/app/models/dtos/categoryAttribute/select/ViewCategoryAttributeDto';
import { Category } from 'src/app/models/category/category';
import { CategoryService } from 'src/app/services/HttpClient/categoryService/category.service';
import { AttributeValue } from 'src/app/models/attributeValue/attributeValue';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ProductService } from 'src/app/services/HttpClient/productService/product.service';
import { EMPTY, catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/services/Helper/error.service';
import { Product } from 'src/app/models/product/product';
import { CategoryAttributeService } from 'src/app/services/HttpClient/categoryAttributeService/category-attribute.service';
import { CkEditorConfigService } from 'src/app/services/Html/CKEditor5/ck-editor-config.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})

/**
 * AddProduct Component
 */
export class AddProductComponent implements OnInit {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  public Editor = Editor;
  //Model
  viewCategoryAttributeDto: ViewCategoryAttributeDto[] = [];
  categories: Category[] = [];
  public product : Product

  //Form
  _productForm: FormGroup;
  //Dropzone

  constructor(
    private categoryAttributeService: CategoryAttributeService,
    private categoryService: CategoryService,
    private productService : ProductService,
    private formBuilder: FormBuilder,
    public ckEditorConfigService : CkEditorConfigService
  ) { }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Ecommerce' },
      { label: 'Create Product', active: true },
    ];
    this.getAllCategory();
    this.productForm();
  }

  /**
   * Form Start
   */
  productForm() {
    this._productForm = this.formBuilder.group({
      categoryId: [0, Validators.required],
      productName: ['', Validators.required],
      description: ['', Validators.required],
      productCode: ['', Validators.required]
    });
  }


   productFill(){
    console.log(this._productForm.value)
      this.product = {
        id : 0,
        categoryId:this._productForm.value.categoryId,
        productName : this._productForm.value.productName,
        description:this._productForm.value.description,
        productCode: this._productForm.value.productCode
    }
    this.productService.products$.next(this.product)
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

  getAllTrueAttrSlicer() {
    
    console.log("Category valeu", this._productForm.value)
    this.categoryAttributeService
      .getAllTrueSlicerAttribute(this._productForm.value.categoryId)
      .subscribe((response) => {
        this.viewCategoryAttributeDto = response.data;
      });
  }

  getAllCategory() {
    this.categoryService.getAll().subscribe((response) => {
      this.categories = response.data;
    });
  }

}
