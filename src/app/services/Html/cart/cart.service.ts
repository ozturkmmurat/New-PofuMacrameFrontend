import { Injectable } from '@angular/core';
import { ProductVariantAttributeValueDto } from 'src/app/models/dtos/productVariant/select/productVarianAttributeValueDto';
import { CartItem } from 'src/app/models/html/cart/cartItem';
import { CartItems } from 'src/app/models/html/cart/cartItems';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  totalPrice = {amount : 0};
  constructor() { }

  addToCart(productVariant : ProductVariantAttributeValueDto)
  {
    let item = CartItems.find(x => x.product.productVariantId == productVariant.productVariantId);
    if (item) {
      item.quantity +=1
      let cartItem = new CartItem();
      cartItem.product = productVariant
      CartItems.push(cartItem)
    }else{
      let cartItem = new CartItem();
      cartItem.product = productVariant;
      cartItem.quantity = 1;
      CartItems.push(cartItem)
    }
  }

  totalAmount(amount = {price:0}){
    this.totalPrice.amount += amount.price
  }

  list(): CartItem[]{
    return CartItems
  }

  getTotalPrice(){
    return this.totalPrice
  }

  removeFromCart(productVariant : ProductVariantAttributeValueDto){
    // let item:CartItem = CartItems.find(x => x.product.productVariantId == productVariant.productVariantId);
    // this.totalPrice.amount -= 
  }
}
