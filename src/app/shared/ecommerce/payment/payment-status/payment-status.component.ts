import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, catchError, switchMap } from 'rxjs';
import { PaymentResultPostParameter } from 'src/app/models/entityParameter/iyzico/paymentResultPostParameter';
import { PaymentService } from 'src/app/services/HttpClient/paymentService/payment.service';
import { OrderService } from 'src/app/services/HttpClient/orderService/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.scss']
})
export class PaymentStatusComponent {

  errorMessage: string;
  paymentStatus: boolean;
  paymentResultPostParameter: PaymentResultPostParameter = { guid: '' };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderPaymentService: PaymentService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.cancel();
    this.route.params.subscribe((params) => {
      const guid = params['guid'];
      if (guid) {
        this.paymentResultPostParameter.guid = guid;
        this.orderService.getByGuid(guid).pipe(
          catchError(() => {
            this.router.navigate(['']);
            return EMPTY;
          }),
          switchMap(() => this.orderPaymentService.paymentResult(this.paymentResultPostParameter))
        ).subscribe({
          next: () => { this.paymentStatus = true; },
          error: (err: HttpErrorResponse) => {
            this.errorMessage = err.error?.message;
            this.paymentStatus = false;
          }
        });
      }
    });
  }

  cancel(): void {
    Swal.mixin({
      customClass: { cancelButton: 'btn btn-danger ms-2' },
      buttonsStyling: true
    });
  }
}
