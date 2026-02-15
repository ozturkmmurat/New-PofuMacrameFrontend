import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { CartService } from 'src/app/services/Html/cart/cart.service';
import { CartItem } from 'src/app/models/html/cart/cartItem';
import { ProductVariantAttributeValueDto } from 'src/app/models/dtos/productVariant/select/productVarianAttributeValueDto';
import { GlobalComponent } from 'src/app/global-component';
import { ProductStockService } from 'src/app/services/HttpClient/productStockService/product-stock.service';
import { ProductStockPriceDto } from 'src/app/models/dtos/productStock/ProductStockPriceDto';

const IMAGE_URL = GlobalComponent.IMAGE_URL;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {
  cartItems: CartItem[] = [];
  stockPriceList: ProductStockPriceDto[] = [];
  imageUrl = IMAGE_URL;

  constructor(
    private cartService: CartService,
    private productStockService: ProductStockService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    await this.cartService.cartSetLocalStorageData();
    this.getCart();
    this.loadStockPrices();
    window.addEventListener('storage', (event) => {
      if (event.key === 'products') {
        this.getCart();
        if (this.cartService.skipNextStoragePriceCheck) {
          this.cdr.markForCheck();
          return;
        }
        this.loadStockPrices();
      }
    });
  }

  getCart(): void {
    this.cartService.cartSetLocalStorageData();
    this.cartItems = this.cartService.cartItemList();
  }

  loadStockPrices(): void {
    this.stockPriceList = [];
    const dto = this.cartService.getCheckPriceDto();
    if (!dto.productVariantId.length) return;

    this.productStockService.checkProductStockPrice(dto).subscribe({
      next: (res) => {
        const data = res.data ?? [];
        if (data.length === this.cartItems.length) {
          this.cartService.applyPriceUpdatesAndPersist(data.map(p => ({ netPrice: p.netPrice })));
          this.getCart();
        }
        this.stockPriceList = data;
        this.cdr.markForCheck();
      }
    });
  }

  removeFromCart(productVariant: ProductVariantAttributeValueDto): void {
    this.cartService.removeFromCart(productVariant);
    this.getCart();
    this.loadStockPrices();
    this.cdr.markForCheck();
  }

  get cartTotalQuantity() {
    return this.cartService.cartTotalQuantity;
  }

  /** Ürün tutarı (teslimat hariç) */
  get productTotalOnly(): number {
    if (!this.cartItems?.length) return 0;
    if (this.stockPriceList.length === this.cartItems.length) {
      return this.cartItems.reduce(
        (sum, _, i) => sum + (this.stockPriceList[i].netPrice ?? 0) * (this.cartItems[i].quantity ?? 0),
        0
      );
    }
    return this.cartService.cartTotalPrice;
  }

  /** Teslimat tutarı (ilçe seçimine göre, sipariş başına tek) */
  get deliveryAmount(): number {
    return this.stockPriceList[0]?.extraPrice ?? 0;
  }

  /** Navbar sepette gösterilecek toplam: ürün tutarı + teslimat (teslimat her zaman eklenir, ilk kalemdeki extraPrice) */
  get displayTotal(): number {
    if (!this.cartItems?.length) return 0;
    const urunToplam = this.productTotalOnly;
    const teslimat = this.deliveryAmount;
    return urunToplam + teslimat;
  }
}
