import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, catchError } from 'rxjs';
import { District } from 'src/app/models/district/district';
import { ProductPriceFactor } from 'src/app/models/productPriceFactor/product-price-factor';
import { ErrorService } from 'src/app/services/Helper/errorService/error.service';
import { DistrictService } from 'src/app/services/HttpClient/districtService/district.service';
import { ProductPriceFactorService } from 'src/app/services/HttpClient/productPriceFactorService/product-price-factor.service';

@Component({
  selector: 'app-product-pricefactor',
  templateUrl: './product-pricefactor.component.html',
  styleUrls: ['./product-pricefactor.component.scss'],
})
export class ProductPricefactorComponent {
  list: ProductPriceFactor[] = [];
  districts: District[] = [];
  form: FormGroup;

  @ViewChild('addModal') addModal: any;
  @ViewChild('updateModal') updateModal: any;

  constructor(
    private productPriceFactorService: ProductPriceFactorService,
    private districtService: DistrictService,
    private formBuilder: FormBuilder,
    private errorService: ErrorService,
    private modalService: NgbModal,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.loadAll();
    this.loadDistricts();
    this.buildForm();
  }

  loadDistricts() {
    this.districtService.getAll().subscribe((response) => {
      this.districts = response.data ?? [];
    });
  }

  getDistrictName(districtId: number): string {
    const district = this.districts.find((d) => d.id === districtId);
    return district ? district.name : '';
  }

  buildForm() {
    this.form = this.formBuilder.group({
      id: [0],
      districtId: [0, [Validators.required, Validators.min(1)]],
      extraPrice: [null as number | null, [Validators.required, Validators.min(0)]],
      status: [true],
    });
  }

  loadAll() {
    this.productPriceFactorService.getAll().subscribe((response) => {
      this.list = response.data ?? [];
    });
  }

  openAddModal() {
    this.form.reset({ id: 0, districtId: 0, extraPrice: null, status: true });
    this.modalService.open(this.addModal, { size: 'lg', centered: true });
  }

  openUpdateModal(item: ProductPriceFactor) {
    this.form.patchValue({
      id: item.id,
      districtId: item.districtId,
      extraPrice: item.extraPrice != null ? Number(item.extraPrice) : null,
      status: item.status,
    });
    this.modalService.open(this.updateModal, { size: 'lg', centered: true });
  }

  add() {
    if (this.form.invalid) return;
    const val = this.form.get('extraPrice')?.value;
    const extraPrice = val != null && val !== '' ? Number(Number(val).toFixed(2)) : 0;
    const model = { ...this.form.value, extraPrice } as ProductPriceFactor;
    this.productPriceFactorService
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
    const val = this.form.get('extraPrice')?.value;
    const extraPrice = val != null && val !== '' ? Number(Number(val).toFixed(2)) : 0;
    const model = { ...this.form.value, extraPrice } as ProductPriceFactor;
    this.productPriceFactorService
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

  delete(item: ProductPriceFactor) {
    this.productPriceFactorService
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
