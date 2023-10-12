import { Component } from '@angular/core';
import { CartModel } from '../../../layouts/topbar/topbar.model';
import { cartData } from '../../../layouts/topbar/data';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  cartData!: CartModel[];
  total = 0;
  cart_length: any = 0;

  ngOnInit(){
    //  Fetch Data
    this.cartData = cartData;
    this.cart_length = this.cartData.length;
    this.cartData.forEach((item) => {
      var item_price = item.quantity * item.price
      this.total += item_price
    });
  }

    // Delete Item
    deleteItem(event: any, id: any) {
      var price = event.target.closest('.dropdown-item').querySelector('.item_price').innerHTML;
      var Total_price = this.total - price;
      this.total = Total_price;
      this.cart_length = this.cart_length - 1;
      this.total > 1 ? (document.getElementById("empty-cart") as HTMLElement).style.display = "none" : (document.getElementById("empty-cart") as HTMLElement).style.display = "block";
      document.getElementById('item_' + id)?.remove();
    }
}
