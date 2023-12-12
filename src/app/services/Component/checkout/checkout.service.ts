import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor() { }

  addressId = signal(0)

  setAddressId(addressId:number){
    this.addressId.set(addressId)
  }
}
