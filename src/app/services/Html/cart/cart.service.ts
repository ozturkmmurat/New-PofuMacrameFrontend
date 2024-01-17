import { Injectable, signal } from '@angular/core';
import { ProductVariantAttributeValueDto } from 'src/app/models/dtos/productVariant/select/productVarianAttributeValueDto';
import { CartItem } from 'src/app/models/html/cart/cartItem';
import { CartItems } from 'src/app/models/html/cart/cartItems';
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

  addToCart(productVariant: ProductVariantAttributeValueDto) {
    let item = this.cartItemList().find(x => x.product.endProductVariantId == productVariant.endProductVariantId);
    if (item) {
      item.quantity += 1
      this.localStorageService.updateJson("products", this.cartItemList())
      this.cartItemList.set(this.cartItemList())
    } else {
      let cartItem = new CartItem();
      cartItem.product = productVariant;
      cartItem.quantity = 1;
      const currentItems = this.cartItemList()
      currentItems.push(cartItem)
      this.cartItemList.set(currentItems)
      this.localStorageService.addJson("products", this.cartItemList())
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

    this.localStorageService.updateJson("products", this.cartItemList())
   }

   completelyRemoveProductFromCart(productVariant : ProductVariantAttributeValueDto){
    let currentItems = this.cartItemList();

    let index = currentItems.findIndex((x) => x.product.endProductVariantId === productVariant.endProductVariantId);
    if (index !== -1) {
      currentItems.splice(index, 1);
    }
  
    this.cartItemList.set(currentItems);
  
    this.localStorageService.updateJson("products", this.cartItemList())
   }

  get cartTotalQuantity() {
    let cartList = this.cartItemList()
    let totalQuantity = cartList.reduce((total, product) => {
      return total + product.quantity;
    }, 0)
    return totalQuantity
  }

  get cartTotalPrice() {
    let cartList = this.cartItemList()
    let totalPrice = cartList.reduce((total, product) => {
      return total + product.quantity * product.product.netPrice;
    }, 0)
    return totalPrice;
  }
}
