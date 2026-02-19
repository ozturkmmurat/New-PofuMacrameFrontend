import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DropzoneComponent } from 'ngx-dropzone-wrapper';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, catchError } from 'rxjs';
import { GlobalComponent } from 'src/app/global-component';
import { CategoryImage } from 'src/app/models/categoryImage/categoryImage';
import { ErrorService } from 'src/app/services/Helper/errorService/error.service';
import { CategoryImageService } from 'src/app/services/HttpClient/categoryImageService/category-image.service';

const IMAGE_URL = GlobalComponent.IMAGE_URL;

@Component({
  selector: 'app-category-images',
  templateUrl: './category-images.component.html',
  styleUrls: ['./category-images.component.scss'],
})
export class CategoryImagesComponent {
  _categoryImageForm: FormGroup;

  @ViewChild('dropzoneRef', { static: false }) dropzoneRef: DropzoneComponent;

  @Input() categoryImage: CategoryImage;
  @Input() formData: FormData = new FormData();
  @Input() form: FormData[] = [];

  categoryImages: CategoryImage[] = [];
  imageUrl = IMAGE_URL;

  constructor(
    private categoryImageService: CategoryImageService,
    private formBuilder: FormBuilder,
    private errorService: ErrorService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.categoryImageForm();
    this.createImageFormArray();
  }

  categoryImageForm(): void {
    this._categoryImageForm = this.formBuilder.group({
      categoryImageArray: this.formBuilder.array([]),
    });
  }

  get categoryImagesArray(): FormArray {
    return this._categoryImageForm.controls['categoryImageArray'] as FormArray;
  }

  createImageFormArray(): void {
    if (!this.categoryImage?.categoryId) return;
    this.categoryImageService.getAllByCategoryId(this.categoryImage.categoryId).subscribe(({ data }) => {
      data.map((item) => {
        const group = this.formBuilder.group({
          id: new FormControl(item.id),
          categoryId: new FormControl(item.categoryId),
          path: new FormControl(item.path),
          sequenceNumber: new FormControl(item.sequenceNumber),
          createDate: new FormControl(item.createDate ?? ''),
          file: new FormControl(null),
        });
        this.categoryImagesArray.push(group);
      });
    });
  }

  add(): void {
    if (this.formData != null) {
      for (let index = 0; index < this.form.length; index++) {
        this.form[index].forEach((value, key) => {
          this.formData.append(key, value);
        });
      }
      this.categoryImageService
        .addList(this.formData)
        .pipe(
          catchError((err: HttpErrorResponse) => {
            this.errorService.checkError(err);
            this.formData = new FormData();
            return EMPTY;
          })
        )
        .subscribe((response) => {
          this.clearFormData();
          this.dropzoneRef.directiveRef?.reset();
          this.categoryImagesArray.clear();
          this.createImageFormArray();
          this.toastrService.success(response.message, 'Başarılı');
        });
    } else {
      this.toastrService.error('Hata');
    }
  }

  update(row: any, index: number): void {
    const formData = new FormData();
    if (this._categoryImageForm.valid) {
      formData.append('id', row.controls.id.value);
      formData.append('categoryId', row.controls.categoryId.value);
      formData.append('path', row.controls.path.value);
      formData.append('sequenceNumber', row.controls.sequenceNumber.value);
      formData.append('file', this.categoryImagesArray.controls[index].value.file);
      this.categoryImageService
        .update(formData)
        .pipe(
          catchError((err: HttpErrorResponse) => {
            this.errorService.checkError(err);
            return EMPTY;
          })
        )
        .subscribe((response) => {
          this.toastrService.success('Başarılı');
          this.categoryImagesArray.clear();
          this.createImageFormArray();
        });
    }
  }

  delete(row: any, index: number): void {
    const input: CategoryImage = {
      id: row.controls.id.value,
      categoryId: row.controls.categoryId.value,
      path: row.controls.path.value,
      sequenceNumber: row.controls.sequenceNumber.value,
      createDate: row.controls.createDate?.value ?? '',
    };
    this.categoryImageService
      .delete(input)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorService.checkError(err);
          return EMPTY;
        })
      )
      .subscribe((response) => {
        this.toastrService.success('Başarılı');
        this.categoryImagesArray.controls.splice(index, 1);
      });
  }

  onFileRemoved(event: any): void {
    for (let index = 0; index < this.form.length; index++) {
      const formData = this.form[index];
      if (formData.get('Files') === event) {
        this.form.splice(index, 1);
      }
    }
  }

  onComplete(event: any): void {
    const formData: FormData = new FormData();
    formData.append('Files', event);
    formData.append('categoryId', this.categoryImage.categoryId.toString());
    formData.append('name', event.name);
    this.form.push(formData);
  }

  clearFormData(): void {
    this.formData = new FormData();
    this.form = [];
  }

  onFileSelected(event: any, index: number): void {
    this.categoryImagesArray.controls[index].value.file = event.srcElement.files[0];
  }
}
