import { HttpErrorResponse } from '@angular/common/http';
import { Component, effect } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, catchError } from 'rxjs';
import { User } from 'src/app/core/models/auth.models';
import { GlobalComponent } from 'src/app/global-component';
import { SelectUserOrderDto } from 'src/app/models/dtos/order/select/selectOrderDto';
import { SelectSubOrderDto } from 'src/app/models/dtos/subOrder/select/selectSubOrderDto';
import { CancelOrder } from 'src/app/models/libraryModels/iyzico/cancelOrder';
import { RefundingProduct } from 'src/app/models/libraryModels/iyzico/refundingProduct';
import { Order } from 'src/app/models/order/order';
import { SubOrder } from 'src/app/models/subOrder/subOrder';
import { ErrorService } from 'src/app/services/Helper/errorService/error.service';
import { OrderService } from 'src/app/services/HttpClient/orderService/order.service';
import { PaymentService } from 'src/app/services/HttpClient/paymentService/payment.service';
import { UserService } from 'src/app/services/HttpClient/userService/user.service';

const IMAGE_URL = GlobalComponent.IMAGE_URL;


@Component({
  selector: 'app-user-order-detail',
  templateUrl: './user-order-detail.component.html',
  styleUrls: ['./user-order-detail.component.scss']
})
export class UserOrderDetailComponent {

  imageUrl = IMAGE_URL
  orderDetail :  SelectUserOrderDto
  cancelRefundStatus:boolean = false

  cancelOrderModel: CancelOrder = {
    guid: '',
    description: ''
  };

  refundingProduct: RefundingProduct = {
    subOrderId: 0,
    orderId: 0,
    description: '',
    orderGuid: ''
  };

  guid: string;

  constructor(
    private orderService : OrderService,
    private route : ActivatedRoute,
    private userService : UserService,
    private paymentService : PaymentService,
    private errorService : ErrorService,
    private toastrService : ToastrService,
    private modalService : NgbModal) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['guid']) {
        this.guid = params['guid'];
        this.getOrderDetail(this.guid);
      }
    });
  }

  
 /**
   * Open modal
   * @param content modal content
   */
  private modalRef : NgbModalRef;
  openModal(content:any){
    this.modalRef = this.modalService.open(content);
    this.modalRef.result.then((result) => {
    }, (reason) => {
      if (!this.cancelRefundStatus) {
        this.toastrService.info("İşlem iptal edilmiştir.");
      }
    });
    this.cancelRefundStatus = false;
  }

  closeModal(){
    if (this.modalRef) {
      this.modalRef.close();
      if(!this.cancelRefundStatus)
      {
        this.toastrService.info("İşlem iptal edilmiştir.");
      }
      this.cancelRefundStatus = false;
    }
  }

  writeCancelOrder(): void {
    this.cancelOrderModel.guid = this.guid;
  }

  writeRefundProduct(selectUserOrderDto: SelectSubOrderDto): void {
    this.refundingProduct.orderId = Number(this.orderDetail?.orderId) ?? 0;
    this.refundingProduct.subOrderId = selectUserOrderDto.subOrderId;
    this.refundingProduct.orderGuid = this.guid ?? '';
  }

  getOrderDetail(guid: string): void {
    const request: Order = {
      id: 0,
      userId: 0,
      totalPrice: 0,
      extraPrice:0,
      orderCode: '',
      orderDate: undefined,
      orderStatus: 0,
      address: '',
      guid:this.guid
    };
    this.orderService.getUserOrderDtoDetail(request).subscribe(response => {
      this.orderDetail = response.data;
    });
  }

  cancelOrder(){
    this.writeCancelOrder();
    if (this.cancelOrderModel.guid) {
        this.paymentService.cancelOrder(this.cancelOrderModel).pipe(
          catchError((err:HttpErrorResponse) => {
            this.errorService.checkError(err);
            this.cancelRefundStatus = true
            this.closeModal()
            return EMPTY;
          }))
          .subscribe((response) => {
            this.toastrService.success("Siparişiniz başarıyla iptal edilmiştir.")
            this.cancelRefundStatus = true
            this.getOrderDetail(this.guid);
            this.closeModal()
          })
    }
  }

  refundProduct(){
    if (this.refundingProduct.orderGuid && this.refundingProduct.subOrderId > 0) {
      this.paymentService.refundProduct(this.refundingProduct).pipe(
        catchError((err : HttpErrorResponse) => {
          this.errorService.checkError(err);
          this.cancelRefundStatus = true
          this.closeModal()
          return EMPTY;
        }))
        .subscribe((response) => {
          this.cancelRefundStatus = true
          this.getOrderDetail(this.guid)
          this.closeModal()
          this.toastrService.success("Sipariş iade süreciniz başlatılmıştır.")
        })
    }
  }

  

}
