import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CartModel } from '../../../layouts/topbar/topbar.model';
import { cartData } from '../../../layouts/topbar/data';
import { CartService } from 'src/app/services/Html/cart/cart.service';
import { CartItem } from 'src/app/models/html/cart/cartItem';
import { ProductVariantAttributeValueDto } from 'src/app/models/dtos/productVariant/select/productVarianAttributeValueDto';
import { GlobalComponent } from 'src/app/global-component';
import { LocalStorageService } from 'src/app/services/Helper/localStorageService/local-storage.service';

const IMAGE_URL = GlobalComponent.IMAGE_URL;


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent {

  cartItems : CartItem[];
  imageUrl = IMAGE_URL

  constructor(private cartService : CartService) {
  }

  async ngOnInit(){
    await this.cartService.cartSetLocalStorageData()
    this.getCart()
  }

  getCart(): Promise<void>{
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
