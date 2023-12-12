import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Cart } from 'src/app/pages/ecommerce/cart/cart.model';
import { cartData } from '../../../pages/ecommerce/cart/data';
import { TsaPaymentParameter } from 'src/app/models/entityParameter/iyzico/tsaPaymentParameter';
import { PaymentService } from 'src/app/services/HttpClient/paymentService/payment.service';
import { CheckoutService } from 'src/app/services/Component/checkout/checkout.service';
import { CartService } from 'src/app/services/Html/cart/cart.service';
import { Router } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/services/Helper/errorService/error.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  tsaPaymentParameter: TsaPaymentParameter = {
    addressId: 0,
    cartItems: null,
    tcNo: "11111111111"
  }
  
  constructor(
    private paymentService : PaymentService, 
    private checkoutService : CheckoutService,
    private cartService : CartService,
    private errorService : ErrorService,
    private toastrService : ToastrService,
    private router : Router) { }

  ngOnInit(): void {
  }

  writeTsaPaymentParameter(){
    return new Promise<void>((resolve, reject) => {
        this.tsaPaymentParameter.addressId = this.checkoutService.addressId()
        this.tsaPaymentParameter.cartItems = this.cartService.cartItemList()
        this.tsaPaymentParameter.tcNo = "11111111111"
        resolve();
    });
  }
  payment(){

    this.writeTsaPaymentParameter().then(() => {
      if(this.tsaPaymentParameter !== null){
        if(this.tsaPaymentParameter.addressId == 0){
          this.toastrService.error("Lütfen bir adres seçiniz.")
        }
        this.paymentService.tsaPayment(this.tsaPaymentParameter).pipe(
          catchError((err:HttpErrorResponse) => {
            this.errorService.checkError(err);
            return EMPTY;
          }))
          .subscribe((response) => {
            this.paymentService.setFormScript(response.data)
            window.location.href = response.data
          })
      }else{
        this.toastrService.error("Ödemeye geçilemiyor.")
      }
    })
  }


}
