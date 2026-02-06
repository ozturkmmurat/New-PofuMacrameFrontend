import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { NgbDropdownModule, NgbModule, NgbProgressbarModule, NgbRatingModule, NgbToastModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PaymentRoutingModule } from "./payment.routing.module";
import { CardPaymentComponent } from "./card-payment/card-payment.component";
import { PaymentStatusComponent } from "./payment-status/payment-status.component";
import { SlickCarouselModule } from "ngx-slick-carousel";
import { defineElement } from "lord-icon-element";
import lottie from 'lottie-web';
@NgModule({
    declarations: [
      CardPaymentComponent,
      PaymentStatusComponent,
    ],
  imports: [
    PaymentRoutingModule,
    NgbModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SlickCarouselModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
  })
  export class PaymentModule { 
    constructor() {
      defineElement (lottie.loadAnimation);
    }
  }