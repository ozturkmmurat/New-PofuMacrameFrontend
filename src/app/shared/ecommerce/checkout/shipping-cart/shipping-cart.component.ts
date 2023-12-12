import { Component, Output } from '@angular/core';
import { Cart } from 'src/app/pages/ecommerce/cart/cart.model';
import { cartData } from '..//../../../pages/ecommerce/cart/data';
import { CartService } from 'src/app/services/Html/cart/cart.service';
import { GlobalComponent } from 'src/app/global-component';
import { CartItem } from 'src/app/models/html/cart/cartItem';
import { ProductVariantAttributeValueDto } from 'src/app/models/dtos/productVariant/select/productVarianAttributeValueDto';
import { ProductStockService } from 'src/app/services/HttpClient/productStockService/product-stock.service';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TsaPaymentParameter } from 'src/app/models/entityParameter/iyzico/tsaPaymentParameter';
import { UserAddressService } from 'src/app/services/HttpClient/userAddressService/user-address.service';
import { CheckoutService } from 'src/app/services/Component/checkout/checkout.service';
import { PaymentService } from 'src/app/services/HttpClient/paymentService/payment.service';
import { Router } from '@angular/router';

const IMAGE_URL = GlobalComponent.IMAGE_URL;


@Component({
  selector: 'app-shipping-cart',
  templateUrl: './shipping-cart.component.html',
  styleUrls: ['./shipping-cart.component.scss']
})
export class ShippingCartComponent {
  cartItems: CartItem[];
  imageUrl = IMAGE_URL
  tsaPaymentParameter: TsaPaymentParameter = {
    addressId: 0,
    cartItems: null,
    tcNo: "11111111111"
  }

  constructor(private cartService: CartService,
    private productStockService: ProductStockService,
    private toastrService: ToastrService,
    private checkoutService: CheckoutService,
    private paymentService: PaymentService,
    private router: Router) {
  }

  async ngOnInit() {
    await this.cartService.cartSetLocalStorageData();
    this.getCart();

    window.addEventListener('storage', (event) => {
      if (event.key === 'products') {
        this.getCart();
      }
    });
  }

  getCart(): void {
    this.cartService.cartSetLocalStorageData()
    this.cartItems = this.cartService.cartItemList();
    console.log(`The current cart items are: ${this.cartItems}`);
  }

  removeFromCart(productVariant: ProductVariantAttributeValueDto) {
    this.cartService.removeFromCart(productVariant)
  }

  completelyRemoveProductFromCart(productVariant: ProductVariantAttributeValueDto) {
    this.cartService.completelyRemoveProductFromCart(productVariant)
  }

  get cartTotalPrice() {
    return this.cartService.cartTotalPrice
  }

  get cartTotalQuantity() {
    console.log("Gelen", this.cartService.cartTotalQuantity)
    return this.cartService.cartTotalQuantity
  }

  addCart(productVariant: ProductVariantAttributeValueDto) {
    var checkStock = this.checkProductStockByPvId(productVariant.endProductVariantId)
    if (checkStock) {
      this.cartService.addToCart(productVariant);
      this.toastrService.success("Ürün başarıyla sepete eklendi.")
    } else {
      this.toastrService.error("Ürün stokta bulunamadı.")
    }
  }

  checkProductStockByPvId(productVariantId: number) {
    return this.productStockService.getByProductVariantId(productVariantId).pipe(
      map(response => {
        if (response.data.quantity) {
          return true;
        }
        return false;
      })
    );
  }

  writeTsaPaymentParameter(){
    return new Promise<void>((resolve, reject) => {
        this.tsaPaymentParameter.addressId = this.checkoutService.addressId()
        console.log("Adres id kontrol", this.tsaPaymentParameter.addressId)
        this.tsaPaymentParameter.cartItems = this.cartItems
        this.tsaPaymentParameter.tcNo = "11111111111"
        resolve();
    });
  }
  
  payment(){
    this.writeTsaPaymentParameter().then(() => {
      console.log("Servise giden parametre", this.tsaPaymentParameter)
      if(this.tsaPaymentParameter !== null) {
        this.paymentService.tsaPayment(this.tsaPaymentParameter).subscribe(response => {
          if(response !== null) {
            console.log("İşlemden gelen src", response)
            this.paymentService.setFormScript(response.data)
            this.router.navigate(["payment/makePayment"]);
          } else {
            console.error('Response is null');
          }
        }, error => {
          console.error('Error occurred:', error);
        });
      } else {
        console.error('tsaPaymentParameter is null');
      }
    });
  }
}
