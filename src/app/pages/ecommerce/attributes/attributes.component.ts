import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, catchError } from 'rxjs';
import { Attribute } from 'src/app/models/attribute/attribute';
import { ErrorService } from 'src/app/services/Helper/errorService/error.service';
import { AttributeService } from 'src/app/services/HttpClient/attributeService/attribute.service';

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.scss']
})
export class AttributesComponent {

  attributeList: Attribute[] = []
  _attributeForm : FormGroup
  attribute : Attribute

  constructor(
    private attributeService : AttributeService,
    private modalService : NgbModal,
    private formBuilder : FormBuilder,
    private errorService :ErrorService,
    private toastrService : ToastrService
  ) {
  }

  ngOnInit(){
    this.getAll()
    this.attributeForm()
  }

  attributeForm(){
    this._attributeForm = this.formBuilder.group({
      id:[0],
      name:['', Validators.required]
    })
  }

  openAttributeModal(modalName: any) {
    this.modalService.open(modalName, {
      size: 'xl',
      centered: true,
    }).dismissed;
    this.attribute.id
    console.log(this._attributeForm)
  }

  loadAttributeForm(attribute: Attribute) {
    this._attributeForm.patchValue({
      id: attribute.id,
      name: attribute.name
    });
  }

  loadAttributeValue(attribute : any, modalName : any){
    this.attribute = {
      id : attribute.id, name : attribute.name
    }
    this.openAttributeModal(modalName)
  }

  getAll(){
    this.attributeService.getAll().subscribe(response => {
      this.attributeList = response.data
    })
  }

  add(){
    if (this._attributeForm.valid) {
      let attributeModel = Object.assign({}, this._attributeForm.value);
      this.attributeService
        .add(attributeModel)
        .pipe(
          catchError((err: HttpErrorResponse) => {
            this.errorService.checkError(err);
            return EMPTY;
          })
        )
        .subscribe(response => {
          this.getAll();
          this.toastrService.success(response.message, 'Başarılı');
        });
    }
  }

  update()
  {
    if(this._attributeForm.valid){
      let attributeModel = Object.assign({}, this._attributeForm.value);
      this.attributeService
      .update(attributeModel)
      .pipe(
        catchError((err : HttpErrorResponse) => {
          this.errorService.checkError(err);
          return EMPTY;
        })
      )
      .subscribe(response => {
        this.toastrService.success(response.message ,"Başarılı")
        this.getAll()
      })
    }
  }

  delete(attribute : Attribute){
    this.attributeService.delete(attribute).pipe(
      catchError((err : HttpErrorResponse) => {
        this.errorService.checkError(err)
        return EMPTY;
      }))
      .subscribe(response => {
        this.toastrService.success(response.message , "Başarılı");
        this.getAll();
      })
  }
}
