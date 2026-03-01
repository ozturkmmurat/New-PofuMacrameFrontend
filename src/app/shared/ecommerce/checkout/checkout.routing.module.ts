import { RouterModule, Routes } from "@angular/router";
import { CheckoutComponent } from "./checkout.component";
import { NgModule } from "@angular/core";
import { ShippingCartComponent } from "./shipping-cart/shipping-cart.component";
import { AddressComponent } from "./address/address.component";

const routes: Routes = [
    { path: '', component: CheckoutComponent },
    { component: ShippingCartComponent },
    { component: AddressComponent }
  ];
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CheckoutRoutingModule {}