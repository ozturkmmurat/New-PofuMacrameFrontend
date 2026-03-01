import { Component } from '@angular/core';
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
import { AuthService } from 'src/app/services/HttpClient/authService/auth.service';
import { LocalStorageService } from 'src/app/services/Helper/localStorageService/local-storage.service';
import { CityService } from 'src/app/services/HttpClient/cityService/city.service';
import { City } from 'src/app/models/city/city';

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
    requestedDeliveryEnd: undefined,
    fullName: '',
    email: '',
    phone: '',
    recipientPhone: '',
    address: '',
    city: '',
    postCode: ''
  };

  cities: City[] = [];

  constructor(
    private paymentService: PaymentService,
    private checkoutService: CheckoutService,
    private cartService: CartService,
    private errorService: ErrorService,
    private toastrService: ToastrService,
    private router: Router,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private cityService: CityService
  ) {}

  get isLoggedIn(): boolean {
    return !!this.localStorageService.getToken();
  }

  ngOnInit(): void {
    this.cityService.getAll().subscribe(res => {
      this.cities = res.data ?? [];
    });
  }

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
      requestedDeliveryEnd,
      fullName: this.tsaPaymentParameter.fullName ?? '',
      email: this.tsaPaymentParameter.email ?? '',
      phone: this.tsaPaymentParameter.phone ?? '',
      recipientPhone: this.tsaPaymentParameter.recipientPhone ?? '',
      address: this.tsaPaymentParameter.address ?? '',
      city: this.tsaPaymentParameter.city ?? '',
      postCode: this.tsaPaymentParameter.postCode ?? ''
    };
  }

  writeTsaPaymentParameter(): Promise<void> {
    this.tsaPaymentParameter.productPriceFactorId = this.cartService.defaultProductPriceFactorId;
    this.tsaPaymentParameter.cartItems = this.cartService.cartItemList();
    this.tsaPaymentParameter.tcNo = '11111111111';
    this.tsaPaymentParameter.requestedDeliveryStart = this.cartService.requestedDeliveryStart || undefined;
    this.tsaPaymentParameter.requestedDeliveryEnd = this.cartService.requestedDeliveryEnd || undefined;
    if (this.isLoggedIn) {
      this.tsaPaymentParameter.addressId = this.checkoutService.addressId();
    } else {
      this.tsaPaymentParameter.addressId = 0;
    }
    return Promise.resolve();
  }

  payment(): void {
    this.writeTsaPaymentParameter().then(() => {
      const p = this.tsaPaymentParameter;
      if (!p.recipientPhone?.trim()) {
        this.toastrService.error('Alıcı telefonu zorunludur.');
        return;
      }
      if (this.isLoggedIn) {
        if (!p.addressId) {
          this.toastrService.error('Lütfen bir adres seçiniz.');
          return;
        }
      } else {
        if (!p.fullName?.trim() || !p.email?.trim() || !p.phone?.trim() || !p.address?.trim() ||
            !p.city?.trim() || !p.postCode?.trim()) {
          this.toastrService.error('Lütfen tüm adres bilgilerini doldurun.');
          return;
        }
      }
      const payload = this.toTsaPaymentPayload();
      this.paymentService.tsaPayment(payload).pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorService.checkError(err);
          return EMPTY;
        })
      ).subscribe((response) => {
        this.paymentService.setFormScript(response.data);
        window.location.href = response.data;
      });
    });
  }


}
