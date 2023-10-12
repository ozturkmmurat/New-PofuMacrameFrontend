import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, catchError, empty } from 'rxjs';
import { Attribute } from 'src/app/models/attribute/attribute';
import { Category } from 'src/app/models/category/category';
import { CategoryAttribute } from 'src/app/models/categoryAttribute/categoryAttribute';
import { ErrorService } from 'src/app/services/Helper/error.service';
import { AttributeService } from 'src/app/services/HttpClient/attributeService/attribute.service';
import { CategoryAttributeService } from 'src/app/services/HttpClient/categoryAttributeService/category-attribute.service';

@Component({
  selector: 'app-category-attribute',
  templateUrl: './category-attribute.component.html',
  styleUrls: ['./category-attribute.component.scss'],
})
export class CategoryAttributeComponent {
  _categoryAttributeForm: FormGroup;

  attributes: Attribute[] = [];
  categoryAttribute: CategoryAttribute;

  @Input() category: Category;

  constructor(
    private categoryAttributeService: CategoryAttributeService,
    private attributeService: AttributeService,
    private formBuilder: FormBuilder,
    private errorService: ErrorService,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.getAllAttribute();
    this.categoryAttributeForm();
    this.getAll();
  }

  categoryAttributeForm() {
    this._categoryAttributeForm = this.formBuilder.group({
      categoryId: [this.category.id, Validators.required],
      attributeId: [0, Validators.required],
      slicer: [false],
      attribute: [false],
      required: [false],
      categoryAttributes: this.formBuilder.array([]),
    });
  }

  get categoryAttributeArray() {
    return this._categoryAttributeForm.controls[
      'categoryAttributes'
    ] as FormArray;
  }

  getAll() {
    this.categoryAttributeService
      .getAllByCategoryId(this.category.id)
      .subscribe(({ data }) => {
        data.map((item) => {
          const group = this.formBuilder.group({
            categoryAttributeId: new FormControl(item.categoryAttributeId),
            categoryId: new FormControl(item.categoryId),
            attributeId: new FormControl(item.attributeId),
            variableId: new FormControl(item.variableId),
            slicer: new FormControl(item.slicer),
            attribute: new FormControl(item.attribute),
            required: new FormControl(item.required),
          });
          this.categoryAttributeArray.push(group);
        });
      });
  }

  getAllAttribute() {
    this.attributeService.getAll().subscribe((response) => {
      this.attributes = response.data;
    });
  }

  add() {
    console.log('Metod çalıştı');
    if (this._categoryAttributeForm.valid) {
      let categoryAttributeModel = Object.assign(
        {},
        this._categoryAttributeForm.value
      );
      this.categoryAttributeService
        .add(categoryAttributeModel)
        .pipe(
          catchError((err: HttpErrorResponse) => {
            this.errorService.checkError(err);
            return EMPTY;
          })
        )
        .subscribe((response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.categoryAttributeArray.clear();
          this.getAll();
        });
    } else {
      console.log(this._categoryAttributeForm);
      this.toastrService.error('Formu eksiksiz doldurun.');
    }
  }

  update(row:any){
    if(this.categoryAttributeArray.valid){
      this.categoryAttributeService.update(this.mapCategoryAttribute(row)).pipe(
        catchError((err : HttpErrorResponse) => {
        this.errorService.checkError(err)
        return EMPTY;
        }))
        .subscribe(response => {
          this.toastrService.success(response.message, "Başarılı")
        })
    }
    else{
      this.toastrService.error("Formu eksiksiz doldurun.")
    }
  }

  delete(row: any, index: number) {
    this.categoryAttributeService
      .delete(this.mapCategoryAttribute(row))
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorService.checkError(err);
          return EMPTY;
        })
      )
      .subscribe((response) => {
        this.toastrService.success(response.message, 'Başarılı');
        this.categoryAttributeArray.controls.splice(index, 1);
      });
  }

  mapCategoryAttribute(row: any) {
    const categoryAttribute = {
      id: row.controls.categoryAttributeId.value,
      categoryId: row.controls.categoryId.value,
      attributeId: row.controls.attributeId.value,
      variableId: row.controls.variableId.value,
      slicer: row.controls.slicer.value,
      attribute: row.controls.attribute.value,
      required: row.controls.required.value,
    };
    return categoryAttribute;
  }

  checkboxChanged(formName : string) {
    if(formName == "slicer" && this._categoryAttributeForm.get("slicer")?.value){
      console.log("Giriş yapıldı")
      this._categoryAttributeForm.get("attribute")?.setValue(false)
    }
    else if(formName == "attribute" && this._categoryAttributeForm.get("attribute")?.value){
      this._categoryAttributeForm.get("slicer")?.setValue(false)
    }
  }


  checkboxChangedArray(row:any, index: number, changedCheckbox: string) {
    if (row instanceof FormGroup)  {  // Row bir formgroup mu degil mi kontrol ediliyor
      if (changedCheckbox === 'slicer' && row.get('slicer')?.value) {
        // Slicer true olduğunda, attribute false yap
        row.get('attribute')?.setValue(false);
      } else if (changedCheckbox === 'attribute' && row.get('attribute')?.value) {
        // Attribute true olduğunda, slicer false yap
        row.get('slicer')?.setValue(false);
      }
    }
  }
}
