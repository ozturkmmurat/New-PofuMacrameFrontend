import { Injectable, signal } from '@angular/core';
import { ProductVariantAttributeValueDto } from 'src/app/models/dtos/productVariant/select/productVarianAttributeValueDto';
import { CartItem } from 'src/app/models/html/cart/cartItem';
import { CartItems } from 'src/app/models/html/cart/cartItems';
import { LocalStorageService } from '../../Helper/localStorageService/local-storage.service';

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
      this.localStorageService.update("products", this.cartItemList())
      this.cartItemList.set(this.cartItemList())
    } else {
      let cartItem = new CartItem();
      cartItem.product = productVariant;
      cartItem.quantity = 1;
      const currentItems = this.cartItemList()
      currentItems.push(cartItem)
      this.cartItemList.set(currentItems)
      this.localStorageService.add("products", this.cartItemList())
    }
  }

  list(): CartItem[] {
    return CartItems
  }


  get getCart() {
    let getCartData = JSON.parse(this.localStorageService.getItem("products"))
    return getCartData
  }

  test() {
    let myData = this.getCart();
    if (myData && myData.length > 0) {
      console.log('Veri dolu');
      console.log("Yüklenecek veri", this.getCart())
      this.cartItemList.set(this.getCart());
    }
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

    this.localStorageService.update("products", this.cartItemList())
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
      return total + product.quantity * product.product.price;
    }, 0)
    return totalPrice;
  }
}
