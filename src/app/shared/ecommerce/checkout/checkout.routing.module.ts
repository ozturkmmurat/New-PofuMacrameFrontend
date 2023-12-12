import { RouterModule, Routes } from "@angular/router";
import { CheckoutComponent } from "./checkout.component";
import { NgModule } from "@angular/core";
import { LoginGuard } from "src/app/guards/login/login.guard";
import { ShippingCartComponent } from "./shipping-cart/shipping-cart.component";
import { AddressComponent } from "./address/address.component";

const routes: Routes = [
    {
      path: '',
      component: CheckoutComponent,
      canActivate:[LoginGuard],
      data:{roles:['user', 'admin', 'official']}
    },
    {
      component:ShippingCartComponent,
      canActivate:[LoginGuard],
      data:{roles:['user', 'admin', 'official']}
    },
    {
      component:AddressComponent,
      canActivate:[LoginGuard],
      data:{roles:['user', 'admin', 'official']}
    }
  ];
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CheckoutRoutingModule {}