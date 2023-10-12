import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, catchError } from 'rxjs';
import { Category } from 'src/app/models/category/category';
import { ErrorService } from 'src/app/services/Helper/error.service';
import { CategoryService } from 'src/app/services/HttpClient/categoryService/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent {
  categories: Category[] = [];
  category : Category
  _categoryForm: FormGroup;
  categoryId:number

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private errorService: ErrorService,
    private modalService: NgbModal,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.getAll();
    this.categoryForm();
  }

  categoryForm() {
    this._categoryForm = this.formBuilder.group({
      id: [0],
      categoryName: ['', Validators.required],
      parentId: [0],
      isParent: false,
    });
    console.log(this._categoryForm);
  }

  loadCategoryForm(category: Category) {
    this._categoryForm.patchValue({
      id: category.id,
      parentId: category.parentId,
      categoryName: category.categoryName,
      isParent: true,
    });
  }

  resetCategoryForm() {
    this._categoryForm.patchValue({
      id: 0,
      parentId: 0,
      categoryName: '',
      isParent: false,
    });
  }

  getAll() {
    this.categoryService.getAll().subscribe((response) => {
      this.categories = response.data;
    });
  }

  add() {
    if (this._categoryForm.valid) {
      let categoryModel = Object.assign({}, this._categoryForm.value);
      this.categoryService
        .add(categoryModel)
        .pipe(
          catchError((err: HttpErrorResponse) => {
            this.errorService.checkError(err);
            return EMPTY;
          })
        )
        .subscribe((response) => {
          this.getAll();
          this.toastrService.success(response.message, 'Başarılı');
        });
    }
  }

  update() {
    if (this._categoryForm.valid) {
      let categoryModel = Object.assign({}, this._categoryForm.value);
      this.categoryService
        .update(categoryModel)
        .pipe(
          catchError((err: HttpErrorResponse) => {
            this.errorService.checkError(err);
            return EMPTY;
          })
        )
        .subscribe((response) => {
          this.getAll();
          this.toastrService.success(response.message, 'Başarılı');
        });
    }
  }

  delete(category : Category){
    this.categoryService.delete(category).pipe(
      catchError((err : HttpErrorResponse) => {
        this.errorService.checkError(err)
        return EMPTY;
      }))
      .subscribe(response => {
        this.toastrService.success(response.message , "Başarılı");
        this.getAll();
      })
  }

  checkMainCategoryInput() {
    console.log("IsParent", this._categoryForm.value.isParent)
    if (this._categoryForm.value.isParent == true) {
      this._categoryForm.get('parentId')?.setValue(0);
    }else if(this._categoryForm.value.isParent == false){
      if (this._categoryForm.value.productId != 0 && this._categoryForm.value.productId != null) {
        var keepId = this._categoryForm.value.parentId
        this._categoryForm.get('parentId')?.setValue(keepId);

      }
    }
  }

  @ViewChild('addCategoryModal') addCategoryModal: any;

  async openAddCategoryModal() {
    await this.resetCategoryForm()
    this.modalService.open(this.addCategoryModal, {
      size: 'xl',
      centered: true,
    }).dismissed;
  }

  @ViewChild('updateCategoryModal') updateCategoryModal: any;

  async openUpdateCategoryModal(category: Category) {
    await this.resetCategoryForm();
    this.loadCategoryForm(category);
    this.modalService.open(this.updateCategoryModal, {
      size: 'xl',
      centered: true,
    }).dismissed;
  }

  @ViewChild('exlargeModalAttribute') exlargeModalAttribute: any; 

  openAttributeModal(){
    this.modalService.open(this.exlargeModalAttribute, {size:'xl', centered:true}).dismissed
  }

  attributeModal(row : any){
    this.category = row
    this.openAttributeModal()
  }

}
