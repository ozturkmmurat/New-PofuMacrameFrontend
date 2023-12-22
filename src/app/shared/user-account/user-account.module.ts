import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { UserAccountRoutingModule } from "./user-account.routing.module";
import { UserAccountComponent } from "./user-account.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbAccordionModule, NgbDropdownModule, NgbModalModule, NgbNavModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxSliderModule } from "ngx-slider-v2";
import { UserInformationComponent } from "./user-information/user-information.component";
import { UserOrdersComponent } from "./user-orders/user-orders.component";
import { UserOrderDetailComponent } from "./user-order-detail/user-order-detail.component";
import { AddressComponent } from "../ecommerce/checkout/address/address.component";
import { CheckoutModule } from "../ecommerce/checkout/checkout.module";

@NgModule({
    declarations: [
      UserAccountComponent,
      UserInformationComponent,
      UserOrdersComponent,
      UserOrderDetailComponent,
    ],
  imports: [
    UserAccountRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbAccordionModule,
    NgxSliderModule,
    NgbNavModule,
    NgbAccordionModule,
    NgbDropdownModule,
    CheckoutModule,
    NgbModalModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: []
})
  export class UserAccountModule { 
    constructor() {
    }
  }