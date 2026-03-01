import { NgModule } from "@angular/core";
import { CheckoutComponent } from "./checkout.component";
import { CheckoutRoutingModule } from "./checkout.routing.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from "ngx-mask";
import { ShippingCartComponent } from "./shipping-cart/shipping-cart.component";
import { AddressComponent } from "./address/address.component";

@NgModule({
    declarations: [
      CheckoutComponent,
      ShippingCartComponent,
      AddressComponent
    ],
  imports: [
    CheckoutRoutingModule,
    NgbModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [provideNgxMask()],
  exports:[AddressComponent]
  })
  export class CheckoutModule { 
    constructor() {
    }
  }