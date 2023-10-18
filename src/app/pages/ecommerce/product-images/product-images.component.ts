import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Component, Input, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { remove } from 'lodash';
import { DropzoneComponent } from 'ngx-dropzone-wrapper';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, catchError } from 'rxjs';
import { GlobalComponent } from 'src/app/global-component';
import { ProductImage } from 'src/app/models/productImage/productImage';
import { ErrorService } from 'src/app/services/Helper/errorService/error.service';
import { ProductImageService } from 'src/app/services/HttpClient/productImageService/product-image.service';

  //Global Variable
  const IMAGE_URL = GlobalComponent.IMAGE_URL;

@Component({
  selector: 'app-product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.scss'],
})
export class ProductImagesComponent {
  //Form Start
  _productImageForm: FormGroup;
  //Component Start
  @ViewChild('dropzoneRef', { static: false }) dropzoneRef: DropzoneComponent;

  //Input Start
  @Input() productImage: ProductImage;
  @Input() formData: FormData = new FormData();
  @Input() form : FormData[] = []
  //Modal Start
  productImages : ProductImage[] = [];
  imageUrl = IMAGE_URL

  private selectedFile: File | undefined;
  /**
   *
   */
  constructor(
    private productImageService: ProductImageService,
    private formBuilder: FormBuilder,
    private errorService: ErrorService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.productImageForm()
    this.createImageFormArray()
  }

  productImageForm(){
    this._productImageForm = this.formBuilder.group({
      productImageArray: this.formBuilder.array([
        ]),
    })
  }

  get productImagesArray(){
      return this._productImageForm.controls["productImageArray"] as FormArray
  }

  createImageFormArray(){
    this.productImageService.getAllImageByProductVariantId(this.productImage.productVariantId).subscribe(({data}) => {
      data.map(item => {
        const group = this.formBuilder.group({
          id: new FormControl(item.id),
          productId : new FormControl(item.productId),
          productVariantId : new FormControl(item.productVariantId),
          path: new FormControl(item.path),
          isMain: new FormControl(item.isMain),
          file: new FormControl()
        })
      this.productImagesArray.push(group)
      })
    })
  }

  add() {
    if (this.formData != null) {
      for (let index = 0; index < this.form.length; index++) {
        this.form[index].forEach((value, key) => {
          this.formData.append(key, value);
        });
      }
      this.productImageService
        .addList(this.formData)
        .pipe(
          catchError((err: HttpErrorResponse) => {
            this.errorService.checkError(err);
            this.formData = new FormData();
            return EMPTY;
          })
        )
        .subscribe((response) => {
          this.clearFormData()
          this.dropzoneRef.directiveRef?.reset()
          this.productImagesArray.clear()
          this.createImageFormArray()
          this.toastrService.success(response.message, 'Başarılı');
        });
    }
    else{
      this.toastrService.error("Hata")
    }
  }


  update(row:any, index : any){
    const formData = new FormData();
    if(this._productImageForm.valid){
      formData.append("id", row.controls.id.value)
      formData.append("productId", row.controls.productId.value)
      formData.append("productVariantId", row.controls.productVariantId.value)
      formData.append("path", row.controls.path.value)
      formData.append("isMain", row.controls.isMain.value)
      formData.append("file", this.productImagesArray.controls[index].value.file)
      this.productImageService.update(formData).pipe(
        catchError((err:HttpErrorResponse) => {
          this.errorService.checkError(err)
          return EMPTY
        }))
        .subscribe(response => {
          this.toastrService.success("Başarılı")
          this.productImagesArray.clear()
          this.createImageFormArray()
        })
    }

  }

  delete(row : any, index :number){
    const input = {
      id: row.controls.id.value,
      productId : row.controls.productId.value,
      productVariantId: row.controls.productVariantId.value,
      path: row.controls.path.value,
      isMain: row.controls.isMain.value
    }
    this.productImageService.delete(input).pipe(
      catchError((err:HttpErrorResponse) => {
        this.errorService.checkError(err)
        return EMPTY
      }))
      .subscribe(response => {
        this.toastrService.success("Başarılı")
        this.productImagesArray.controls.splice(index, 1)
      })
  }

  onFileRemoved(event: any): void {
    for (let index = 0; index < this.form.length; index++) {
      const formData = this.form[index]; // FormData nesnesini al
      if (formData.get("Files") == event) {
        this.form.splice(index, 1)
      }
    }
  }
  
  onComplete(event: any): void {
    let formData: FormData = new FormData();
    formData.append('Files', event);
    formData.append(
      'productVariantId',
      this.productImage.productVariantId.toString()
    );
    formData.append('productId', this.productImage.productId.toString())
    formData.append('name', event.name)
    this.form.push(formData)
  }

  clearFormData(): void {
    this.formData = new FormData();
    this.form = [];
  }

  onFileSelected(event : any, index : any){
    this.productImagesArray.controls[index].value.file = event.srcElement.files[0]
  }
  

}
