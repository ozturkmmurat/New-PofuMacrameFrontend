import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, catchError } from 'rxjs';
import { District } from 'src/app/models/district/district';
import { ErrorService } from 'src/app/services/Helper/errorService/error.service';
import { DistrictService } from 'src/app/services/HttpClient/districtService/district.service';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.scss'],
})
export class DistrictComponent {
  list: District[] = [];
  form: FormGroup;

  @ViewChild('addModal') addModal: any;
  @ViewChild('updateModal') updateModal: any;

  constructor(
    private districtService: DistrictService,
    private formBuilder: FormBuilder,
    private errorService: ErrorService,
    private modalService: NgbModal,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.loadAll();
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      id: [0],
      code: ['', Validators.required],
      name: ['', Validators.required],
    });
  }

  loadAll() {
    this.districtService.getAll().subscribe((response) => {
      this.list = response.data ?? [];
    });
  }

  openAddModal() {
    this.form.reset({ id: 0, code: '', name: '' });
    this.modalService.open(this.addModal, { size: 'lg', centered: true });
  }

  openUpdateModal(item: District) {
    this.form.patchValue({
      id: item.id,
      code: item.code,
      name: item.name,
    });
    this.modalService.open(this.updateModal, { size: 'lg', centered: true });
  }

  add() {
    if (this.form.invalid) return;
    const model = this.form.value as District;
    this.districtService
      .add(model)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorService.checkError(err);
          return EMPTY;
        })
      )
      .subscribe((response) => {
        this.toastrService.success(response.message ?? 'Başarılı');
        this.modalService.dismissAll();
        this.loadAll();
      });
  }

  update() {
    if (this.form.invalid) return;
    const model = this.form.value as District;
    this.districtService
      .update(model)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorService.checkError(err);
          return EMPTY;
        })
      )
      .subscribe((response) => {
        this.toastrService.success(response.message ?? 'Başarılı');
        this.modalService.dismissAll();
        this.loadAll();
      });
  }

  delete(item: District) {
    this.districtService
      .delete(item)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorService.checkError(err);
          return EMPTY;
        })
      )
      .subscribe((response) => {
        this.toastrService.success(response.message ?? 'Başarılı');
        this.loadAll();
      });
  }
}
