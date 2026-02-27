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
import { CartItem } from 'src/app/models/html/cart/cartItem';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  tsaPaymentParameter: TsaPaymentParameter = {
    addressId: 0,
    productPriceFactorId: 0,
    cartItems: null,
    orderDescription: '',
    tcNo: '11111111111',
    requestedDeliveryStart: undefined,
    requestedDeliveryEnd: undefined
  };

  constructor(
    private paymentService: PaymentService,
    private checkoutService: CheckoutService,
    private cartService: CartService,
    private errorService: ErrorService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  /** API'ye int gidebilmesi için sayı alanlarını number yapıp döndürür. productPriceFactorId sadece TsaPaymentParameter'da. */
  private toTsaPaymentPayload(): TsaPaymentParameter {
    const addressId = Number(this.tsaPaymentParameter.addressId) || 0;
    const cartItems: CartItem[] = (this.tsaPaymentParameter.cartItems || []).map(item => ({
      ...item,
      product: {
        ...item.product,
        productId: Number(item.product?.productId) || 0,
        productVariantId: Number(item.product?.productVariantId) || 0,
        endProductVariantId: Number(item.product?.endProductVariantId) || 0
      },
      quantity: Number(item.quantity) || 0
    }));
    const requestedDeliveryStart = this.tsaPaymentParameter.requestedDeliveryStart
      ? new Date(this.tsaPaymentParameter.requestedDeliveryStart)
      : undefined;
    const requestedDeliveryEnd = this.tsaPaymentParameter.requestedDeliveryEnd
      ? new Date(this.tsaPaymentParameter.requestedDeliveryEnd)
      : undefined;
    return {
      addressId,
      productPriceFactorId: Number(this.tsaPaymentParameter.productPriceFactorId) || 0,
      cartItems,
      orderDescription: this.tsaPaymentParameter.orderDescription || '',
      tcNo: this.tsaPaymentParameter.tcNo || '11111111111',
      requestedDeliveryStart,
      requestedDeliveryEnd
    };
  }

  writeTsaPaymentParameter() {
    return new Promise<void>((resolve) => {
      this.tsaPaymentParameter.addressId = this.checkoutService.addressId();
      this.tsaPaymentParameter.productPriceFactorId = this.cartService.defaultProductPriceFactorId;
      this.tsaPaymentParameter.cartItems = this.cartService.cartItemList();
      this.tsaPaymentParameter.tcNo = '11111111111';
      // Sepete ilk ürün eklenirken yazılan teslimat tarih/saat aralığını al
      this.tsaPaymentParameter.requestedDeliveryStart = this.cartService.requestedDeliveryStart || undefined;
      this.tsaPaymentParameter.requestedDeliveryEnd = this.cartService.requestedDeliveryEnd || undefined;
      resolve();
    });
  }
  payment(){
    this.writeTsaPaymentParameter().then(() => {
      if(this.tsaPaymentParameter !== null){
        if(this.tsaPaymentParameter.addressId == 0){
          this.toastrService.error("Lütfen bir adres seçiniz.")
        }
        const payload = this.toTsaPaymentPayload();
        this.paymentService.tsaPayment(payload).pipe(
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
