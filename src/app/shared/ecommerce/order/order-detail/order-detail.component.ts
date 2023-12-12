import { Component } from '@angular/core';
import { GlobalComponent } from 'src/app/global-component';
import { ProductVariantAttributeValueDto } from 'src/app/models/dtos/productVariant/select/productVarianAttributeValueDto';
import { CartItem } from 'src/app/models/html/cart/cartItem';
import { CartService } from 'src/app/services/Html/cart/cart.service';

const IMAGE_URL = GlobalComponent.IMAGE_URL;
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})

export class OrderDetailComponent {


  cartItems: CartItem[];
  imageUrl = IMAGE_URL
  
  constructor(private cartService: CartService) {
  }

  async ngOnInit() {
    await this.cartService.cartSetLocalStorageData()
    this.getCart()
  }

  getCart(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.cartItems = this.cartService.cartItemList()
      console.log("Cart ıtems", this.cartItems)
      resolve()
    });
  }

  removeFromCart(productVariant:ProductVariantAttributeValueDto){
    this.cartService.removeFromCart(productVariant)
  }

  get cartTotalPrice(){
    return this.cartService.cartTotalPrice
  }

  get cartTotalQuantity(){
    console.log("Gelen", this.cartService.cartTotalQuantity)
    return this.cartService.cartTotalQuantity
  }

}
