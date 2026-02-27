import { Injectable, signal } from '@angular/core';
import { ProductVariantAttributeValueDto } from 'src/app/models/dtos/productVariant/select/productVarianAttributeValueDto';
import { CartItem } from 'src/app/models/html/cart/cartItem';
import { CartItems } from 'src/app/models/html/cart/cartItems';
import { ProductStockPriceCheckDto } from 'src/app/models/dtos/productStock/ProductStockPriceCheckDto';
import { LocalStorageService } from '../../Helper/localStorageService/local-storage.service';
import { GlobalComponent } from 'src/app/global-component';

const IMAGE_URL = GlobalComponent.IMAGE_URL;

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  cartItemList = signal(CartItems)

  private readonly cartPriceFactorStorageKey = 'cartPriceFactorId';
  private readonly deliveryStartStorageKey = 'cartRequestedDeliveryStart';
  private readonly deliveryEndStorageKey = 'cartRequestedDeliveryEnd';

  /** Aynı sekmede applyPriceUpdatesAndPersist → storage event döngüsünü kırmak için; storage listener loadStockPrices atlar. */
  private _skipNextStoragePriceCheck = false;
  get skipNextStoragePriceCheck(): boolean {
    return this._skipNextStoragePriceCheck;
  }

  /** İlk ürün eklenirken seçilen teslimat tarih/saat aralığını yazar */
  setRequestedDeliveryRange(start: Date, end: Date): void {
    this.localStorageService.addJson(this.deliveryStartStorageKey, start);
    this.localStorageService.addJson(this.deliveryEndStorageKey, end);
  }

  /** Sepete daha önce yazılmış teslimat başlangıç zamanı (Date) */
  get requestedDeliveryStart(): Date | null {
    try {
      const raw = this.localStorageService.getItem(this.deliveryStartStorageKey);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed ? new Date(parsed) : null;
    } catch {
      return null;
    }
  }

  /** Sepete daha önce yazılmış teslimat bitiş zamanı (Date) */
  get requestedDeliveryEnd(): Date | null {
    try {
      const raw = this.localStorageService.getItem(this.deliveryEndStorageKey);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed ? new Date(parsed) : null;
    } catch {
      return null;
    }
  }

  addToCart(productVariant: ProductVariantAttributeValueDto, productPriceFactorId?: number) {
    const list = this.cartItemList();
    const item = list.find(x => x.product.endProductVariantId == productVariant.endProductVariantId);
    if (item) {
      item.quantity += 1;
      this.localStorageService.updateJson("products", this.cartItemList());
      this.cartItemList.set(this.cartItemList());
    } else {
      const cartItem = new CartItem();
      cartItem.product = productVariant;
      cartItem.quantity = 1;
      const currentItems = this.cartItemList();
      if (currentItems.length === 0 && (productPriceFactorId ?? 0) > 0) {
        this.localStorageService.addJson(this.cartPriceFactorStorageKey, productPriceFactorId);
      }
      currentItems.push(cartItem);
      this.cartItemList.set(currentItems);
      this.localStorageService.addJson("products", this.cartItemList());
      // İlk ürün sepete eklenirken yazılmış teslimat tarih/saat bilgisi korunur; burada ek iş yok.
    }
  }

  get localSotrageCart() {
    let getCartData = JSON.parse(this.localStorageService.getItem("products"))
    console.log("Dönen veri", getCartData)
    return getCartData
  }

  cartSetLocalStorageData() : Promise<void> {
    return new Promise((resolve, reject) => {
    let myData = this.localSotrageCart;
    if (myData && myData.length > 0) {
      this.cartItemList.set(myData);
    }
    resolve()
  })
  }

  removeFromCart(productVariant : ProductVariantAttributeValueDto){
    let currentItems = this.cartItemList();
 
    let index = currentItems.findIndex((x) => x.product.endProductVariantId === productVariant.endProductVariantId);
    if (index !== -1) {
      if (currentItems[index].quantity > 1) {
        currentItems[index].quantity -= 1;
      } else {
        currentItems.splice(index, 1);
      }
    }

    this.cartItemList.set(currentItems);
    this.localStorageService.updateJson("products", this.cartItemList());
    if (currentItems.length === 0) {
      this.localStorageService.remove(this.cartPriceFactorStorageKey);
    }
  }

  completelyRemoveProductFromCart(productVariant : ProductVariantAttributeValueDto){
    const currentItems = this.cartItemList();
    const index = currentItems.findIndex((x) => x.product.endProductVariantId === productVariant.endProductVariantId);
    if (index !== -1) {
      currentItems.splice(index, 1);
    }
    this.cartItemList.set(currentItems);
    this.localStorageService.updateJson("products", this.cartItemList());
    if (currentItems.length === 0) {
      this.localStorageService.remove(this.cartPriceFactorStorageKey);
    }
  }

  get cartTotalQuantity() {
    let cartList = this.cartItemList()
    let totalQuantity = cartList.reduce((total, product) => {
      return total + product.quantity;
    }, 0)
    return totalQuantity
  }

  /** Sipariş için seçilen ilçe (ProductPriceFactor) id'si; ilk ürün eklenirken set edilir, TsaPaymentParameter'da kullanılır. */
  get defaultProductPriceFactorId(): number {
    try {
      const raw = this.localStorageService.getItem(this.cartPriceFactorStorageKey);
      const fromStorage = raw ? Number(JSON.parse(raw)) : 0;
      if (fromStorage > 0) return fromStorage;
    } catch {}
    const list = this.cartItemList();
    const first = list?.find((item: any) => (item.productPriceFactorId ?? 0) > 0);
    return first ? Number((first as any).productPriceFactorId) : 0;
  }

  /** CheckProductStockPrice API'si için DTO; sepet kalemlerinden variant id listesi ve ilçe id üretir. */
  getCheckPriceDto(): ProductStockPriceCheckDto {
    const list = this.cartItemList() ?? [];
    const productVariantId = list.map(item => {
      const p = item.product;
      if (!p) return 0;
      const endId = Number(p.endProductVariantId) || 0;
      const variantId = Number(p.productVariantId) || 0;
      return endId > 0 ? endId : variantId;
    }).filter(id => id > 0);
    return { productVariantId, productPriceFactorId: this.defaultProductPriceFactorId };
  }

  get cartTotalPrice() {
    let cartList = this.cartItemList()
    let totalPrice = cartList.reduce((total, product) => {
      return total + product.quantity * product.product.netPrice;
    }, 0)
    return totalPrice;
  }

  /** Sepetteki ürün fiyatlarını günceller (index sırasıyla) ve localStorage'a yazar. Admin fiyat güncellemesi sonrası sepetin güncel fiyat göstermesi için kullanılır. */
  applyPriceUpdatesAndPersist(updates: Array<{ netPrice: number }>): void {
    const items = this.cartItemList();
    if (!updates?.length || updates.length !== items.length) return;
    for (let i = 0; i < items.length; i++) {
      const newNetPrice = updates[i].netPrice;
      items[i].product.netPrice = newNetPrice;
      items[i].product.price = newNetPrice;
    }
    this._skipNextStoragePriceCheck = true;
    this.localStorageService.updateJson("products", items);
    this.cartItemList.set([...items]);
    setTimeout(() => (this._skipNextStoragePriceCheck = false), 250);
  }
}
