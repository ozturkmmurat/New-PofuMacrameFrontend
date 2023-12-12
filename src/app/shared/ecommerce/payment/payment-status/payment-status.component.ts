import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';
import { PaymentResultPostParameter } from 'src/app/models/entityParameter/iyzico/paymentResultPostParameter';
import { PaymentService } from 'src/app/services/HttpClient/paymentService/payment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.scss']
})
export class PaymentStatusComponent {

  errorMessage : string
  paymentStatus : boolean
  paymentResultPostParameter:PaymentResultPostParameter = {
    orderId : 0
  }
  constructor(
    private route : ActivatedRoute,
    private orderPaymentService : PaymentService
  ) {
  }

  ngOnInit(){
    this.cancel()
    this.route.params.subscribe((params) => {
      if (params['orderId']) {
        this.paymentResultPostParameter.orderId = Number(params['orderId'])
        this.paymentResult()
      }
    });
  }
  cancel() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        cancelButton: 'btn btn-danger ms-2'
      },
      buttonsStyling: true
    });
  }

  paymentResult(){
    this.orderPaymentService.paymentResult(this.paymentResultPostParameter)
    .pipe(
      catchError((err:HttpErrorResponse) => {
        this.errorMessage = err.error.message
        this.paymentStatus = false

        return EMPTY;
      })
    ).subscribe(response => {
      this.paymentStatus = true;
    })
  }
}
