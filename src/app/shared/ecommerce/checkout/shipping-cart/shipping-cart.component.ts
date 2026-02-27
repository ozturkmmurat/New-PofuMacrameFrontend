import { Component, Input } from '@angular/core';
import { CartService } from 'src/app/services/Html/cart/cart.service';
import { CartItem } from 'src/app/models/html/cart/cartItem';
import { ProductVariantAttributeValueDto } from 'src/app/models/dtos/productVariant/select/productVarianAttributeValueDto';
import { ProductStockService } from 'src/app/services/HttpClient/productStockService/product-stock.service';
import { ProductStockPriceDto } from 'src/app/models/dtos/productStock/ProductStockPriceDto';
import { TsaPaymentParameter } from 'src/app/models/entityParameter/iyzico/tsaPaymentParameter';
import { CheckoutService } from 'src/app/services/Component/checkout/checkout.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { GlobalComponent } from 'src/app/global-component';

const IMAGE_URL = GlobalComponent.IMAGE_URL;

@Component({
  selector: 'app-shipping-cart',
  templateUrl: './shipping-cart.component.html',
  styleUrls: ['./shipping-cart.component.scss']
})
export class ShippingCartComponent {

  @Input() paymentParameter: TsaPaymentParameter | null = null;

  cartItems: CartItem[] = [];
  /** API'den gelen fiyatlar: netPrice (ürün), extraPrice (sadece ilk kalemde = ilçe teslimat ücreti, product-price-factor.extraPrice) */
  stockPriceList: ProductStockPriceDto[] = [];
  imageUrl = IMAGE_URL;

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
    private cartService: CartService,
    private productStockService: ProductStockService,
    private toastrService: ToastrService,
    private checkoutService: CheckoutService
  ) {}

  ngOnInit(): void {
    this.cartService.cartSetLocalStorageData().then(() => {
      this.getCart();
      this.loadStockPrices();
    });
    window.addEventListener('storage', (event) => {
      if (event.key === 'products') {
        this.getCart();
        this.loadStockPrices();
      }
    });
  }

  // --- Sepet verisi ---
  getCart(): void {
    this.cartService.cartSetLocalStorageData();
    this.cartItems = this.cartService.cartItemList();
  }

  loadStockPrices(): void {
    this.stockPriceList = [];
    const dto = this.cartService.getCheckPriceDto();
    if (dto.productVariantId.length === 0) return;

    this.productStockService.checkProductStockPrice(dto).subscribe({
      next: (res) => {
        const data = res.data ?? [];
        this.stockPriceList = data;
        if (data.length === this.cartItems.length) {
          this.cartService.applyPriceUpdatesAndPersist(data.map(p => ({ netPrice: p.netPrice })));
        }
      },
      error: () => { this.stockPriceList = []; }
    });
  }

  // --- Fiyat hesaplama (netPrice + ilk kalemde extraPrice = ilçe teslimatı) ---
  getItemUnitPrice(index: number): number {
    if (this.stockPriceList[index]) return this.stockPriceList[index].netPrice;
    return this.cartItems[index]?.product?.netPrice ?? 0;
  }

  getItemLineTotal(index: number): number {
    const result = this.cartItems[index]?.quantity ?? 0;
    return this.getItemUnitPrice(index) * result;
  }

  /** Ürünlerin toplamı (teslimat hariç) */
  get productTotalOnly(): number {
    if (!this.cartItems.length) return 0;
    if (this.stockPriceList.length !== this.cartItems.length) return this.cartService.cartTotalPrice;
    return this.cartItems.reduce(
      (sum, item, i) => sum + (this.stockPriceList[i].netPrice ?? 0) * (item.quantity ?? 0),
      0
    );
  }

  /** Teslimat tutarı: Backend ilk kalemde ProductPriceFactor.extraPrice döner (sipariş başına tek) */
  get deliveryAmount(): number {
    return this.stockPriceList[0]?.extraPrice ?? 0;
  }

  /** Genel toplam = ürün tutarı + teslimat (teslimat her zaman eklenir, ilk kalemdeki extraPrice) */
  get displayCartTotal(): number {
    if (!this.cartItems.length) return 0;
    const urunToplam = this.productTotalOnly;
    const teslimat = this.deliveryAmount;
    return urunToplam + teslimat;
  }

  // --- Sepet işlemleri ---
  removeFromCart(productVariant: ProductVariantAttributeValueDto): void {
    this.cartService.removeFromCart(productVariant);
    this.getCart();
    this.loadStockPrices();
  }

  completelyRemoveProductFromCart(productVariant: ProductVariantAttributeValueDto): void {
    this.cartService.completelyRemoveProductFromCart(productVariant);
    this.getCart();
    this.loadStockPrices();
  }

  addCart(productVariant: ProductVariantAttributeValueDto): void {
    this.productStockService.getByProductVariantId(productVariant.endProductVariantId).pipe(
      map(res => (res.data?.quantity ?? 0) > 0)
    ).subscribe(success => {
      if (success) {
        this.cartService.addToCart(productVariant);
        this.getCart();
        this.loadStockPrices();
        this.toastrService.success('Ürün başarıyla sepete eklendi.');
      } else {
        this.toastrService.error('Ürün stokta bulunamadı.');
      }
    });
  }

  // --- Ödeme parametresi ---
  get cartTotalQuantity(): number {
    return this.cartService.cartTotalQuantity;
  }

  get cartTotalPrice(): number {
    return this.cartService.cartTotalPrice;
  }

  /** Ödeme sayfasına gönderilecek parametreyi doldurur (adres, ilçe/productPriceFactorId, sepet) */
  writeTsaPaymentParameter(): Promise<void> {
    this.tsaPaymentParameter.addressId = this.checkoutService.addressId();
    this.tsaPaymentParameter.productPriceFactorId = this.cartService.defaultProductPriceFactorId;
    this.tsaPaymentParameter.cartItems = this.cartItems;
    this.tsaPaymentParameter.tcNo = '11111111111';
    this.tsaPaymentParameter.requestedDeliveryStart = this.cartService.requestedDeliveryStart || undefined;
    this.tsaPaymentParameter.requestedDeliveryEnd = this.cartService.requestedDeliveryEnd || undefined;
    return Promise.resolve();
  }
}
