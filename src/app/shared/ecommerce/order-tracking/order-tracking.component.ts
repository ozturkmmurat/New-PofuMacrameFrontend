import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, catchError } from 'rxjs';
import { GlobalComponent } from 'src/app/global-component';
import { SelectUserOrderDto } from 'src/app/models/dtos/order/select/selectOrderDto';
import { SelectSubOrderDto } from 'src/app/models/dtos/subOrder/select/selectSubOrderDto';
import { CancelOrder } from 'src/app/models/libraryModels/iyzico/cancelOrder';
import { RefundingProduct } from 'src/app/models/libraryModels/iyzico/refundingProduct';
import { ErrorService } from 'src/app/services/Helper/errorService/error.service';
import { LocalStorageService } from 'src/app/services/Helper/localStorageService/local-storage.service';
import { OrderService } from 'src/app/services/HttpClient/orderService/order.service';
import { PaymentService } from 'src/app/services/HttpClient/paymentService/payment.service';

const IMAGE_URL = GlobalComponent.IMAGE_URL;

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.scss']
})
export class OrderTrackingComponent implements OnInit {

  imageUrl = IMAGE_URL;
  orderDetail: SelectUserOrderDto | null = null;

  trackingForm: FormGroup;
  loading = false;
  submitted = false;

  cancelRefundStatus = false;
  private modalRef: NgbModalRef | null = null;

  guid: string = '';

  cancelOrderModel: CancelOrder = {
    guid: '',
    description: ''
  };

  refundingProduct: RefundingProduct = {
    orderId: 0,
    subOrderId: 0,
    description: '',
    orderGuid: ''
  };

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private paymentService: PaymentService,
    private errorService: ErrorService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    this.trackingForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      orderCode: ['', Validators.required]
    });
  }

  get f() {
    return this.trackingForm.controls;
  }

  ngOnInit(): void {
    // Login olmuş kullanıcıyı bu sayfadan uzaklaştır
    if (this.localStorageService.isAuthenticated()) {
      this.router.navigate(['userAccount', 'myaccount']);
    }
  }

  searchOrder(): void {
    this.submitted = true;
    if (this.trackingForm.invalid) {
      return;
    }

    const { email, orderCode } = this.trackingForm.value;
    this.loading = true;

    this.orderService
      .getUserOrderDtoDetail({ email, orderCode })
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorService.checkError(err);
          this.orderDetail = null;
          this.guid = '';
          this.loading = false;
          return EMPTY;
        })
      )
      .subscribe(response => {
        this.orderDetail = response.data;
        this.guid = response.data?.guid ?? '';
        this.loading = false;
      });
  }

  openModal(content: any): void {
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then(
      () => {},
      () => {
        if (!this.cancelRefundStatus) {
          this.toastrService.info('İşlem iptal edilmiştir.');
        }
      }
    );
    this.cancelRefundStatus = false;
  }

  closeModal(): void {
    if (this.modalRef) {
      this.modalRef.close();
      if (!this.cancelRefundStatus) {
        this.toastrService.info('İşlem iptal edilmiştir.');
      }
      this.cancelRefundStatus = false;
    }
  }

  writeCancelOrder(): void {
    this.cancelOrderModel.guid = this.guid ?? '';
  }

  writeRefundProduct(subOrder: SelectSubOrderDto): void {
    if (!this.orderDetail) {
      return;
    }
    this.refundingProduct.orderId = Number(this.orderDetail.orderId) ?? 0;
    this.refundingProduct.subOrderId = subOrder.subOrderId;
    this.refundingProduct.orderGuid = this.guid ?? '';
  }

  cancelOrder(): void {
    this.writeCancelOrder();
    if (this.cancelOrderModel.guid) {
      this.paymentService
        .cancelOrder(this.cancelOrderModel)
        .pipe(
          catchError((err: HttpErrorResponse) => {
            this.errorService.checkError(err);
            this.cancelRefundStatus = true;
            this.closeModal();
            return EMPTY;
          })
        )
        .subscribe(() => {
          this.toastrService.success('Siparişiniz başarıyla iptal edilmiştir.');
          if (this.guid) {
            this.searchOrder();
          }
          this.cancelRefundStatus = true;
          this.closeModal();
        });
    }
  }

  refundProduct(): void {
    if (this.refundingProduct.orderGuid && this.refundingProduct.subOrderId > 0) {
      this.paymentService
        .refundProduct(this.refundingProduct)
        .pipe(
          catchError((err: HttpErrorResponse) => {
            this.errorService.checkError(err);
            this.cancelRefundStatus = true;
            this.closeModal();
            return EMPTY;
          })
        )
        .subscribe(() => {
          this.cancelRefundStatus = true;
          this.searchOrder();
          this.closeModal();
          this.toastrService.success('Sipariş iade süreciniz başlatılmıştır.');
        });
    }
  }
}

