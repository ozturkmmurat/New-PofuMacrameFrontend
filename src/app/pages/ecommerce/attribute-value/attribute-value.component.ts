import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, catchError } from 'rxjs';
import { Attribute } from 'src/app/models/attribute/attribute';
import { AttributeValue } from 'src/app/models/attributeValue/attributeValue';
import { ErrorService } from 'src/app/services/Helper/errorService/error.service';
import { AttributeValueService } from 'src/app/services/HttpClient/attributeValueService/attribute-value.service';

@Component({
  selector: 'app-attribute-value',
  templateUrl: './attribute-value.component.html',
  styleUrls: ['./attribute-value.component.scss']
})
export class AttributeValueComponent {

  @Input() attribute: Attribute;
  attributeValues : AttributeValue[] = []
  _attributeValueForm : FormGroup

  constructor(
    private attributeValueService : AttributeValueService,
    private formBuilder : FormBuilder,
    private errorService : ErrorService,
    private toastrService : ToastrService
  ) {
  }

  ngOnInit(){
    this.attributeValueForm()
    this.getAllByAttributeId(this.attribute.id)
  }

  attributeValueForm(){
    this._attributeValueForm = this.formBuilder.group({
      id:[0],
      attributeId:[this.attribute.id, Validators.required],
      value:['', Validators.required],
      attributeValues: this.formBuilder.array([]),
    })
    console.log(this.attributeValueArray)
  }

  get attributeValueArray() {
    return this._attributeValueForm.controls[
      'attributeValues'
    ] as FormArray;
  }

  getAllByAttributeId(attributeId : number){
    this.attributeValueService.getAllByAttributeId(attributeId).subscribe(({data}) => {
      console.log("Data", data)
      data.map((item) => {
        const group = this.formBuilder.group({
          id : new FormControl(item.id),
          attributeId : new FormControl(item.attributeId),
          value : new FormControl(item.value)
        })
        this.attributeValueArray.push(group)
      })
    })
  }


  add() {
    console.log('Metod çalıştı');
    if (this._attributeValueForm.valid) {
      let attributeValueModel = Object.assign({},this._attributeValueForm.value);
      this.attributeValueService
        .add(attributeValueModel)
        .pipe(
          catchError((err: HttpErrorResponse) => {
            this.errorService.checkError(err);
            return EMPTY;
          })
        )
        .subscribe((response) => {
          this.toastrService.success(response.message, 'Başarılı');
          this.attributeValueArray.clear();
          this.getAllByAttributeId(this.attribute.id);
        });
    } else {
      this.toastrService.error('Formu eksiksiz doldurun.');
    }
  }


  update(row:any){
    if(this.attributeValueArray.valid){
      console.log("Gelen row", row)
      this.attributeValueService.update(row.value).pipe(
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
    this.attributeValueService
      .delete(row.value)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorService.checkError(err);
          return EMPTY;
        })
      )
      .subscribe((response) => {
        this.toastrService.success(response.message, 'Başarılı');
        this.attributeValueArray.controls.splice(index, 1);
      });
  }

  test(){
    console.log("Gelen attribute", this.attribute)
    console.log("Form", this.attributeValueArray)
  }

}
