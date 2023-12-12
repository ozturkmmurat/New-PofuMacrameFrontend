import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { NgbDropdownModule, NgbModule, NgbProgressbarModule, NgbRatingModule, NgbToastModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PaymentRoutingModule } from "./payment.routing.module";
import { CardPaymentComponent } from "./card-payment/card-payment.component";
import { PaymentStatusComponent } from "./payment-status/payment-status.component";
import { SharedModule } from "../../shared.module";
import { SlickCarouselModule } from "ngx-slick-carousel";
import { SimplebarAngularModule } from "simplebar-angular";
import { ScrollToModule } from "@nicky-lenaers/ngx-scroll-to";
import { FlatpickrModule } from "angularx-flatpickr";
import { CountUpModule } from "ngx-countup";
import { LeafletModule } from "@asymmetrik/ngx-leaflet";
import { PagesRoutingModule } from "src/app/pages/pages-routing.module";
import { WidgetModule } from "../../widget/widget.module";
import { LightboxModule } from "ngx-lightbox";
import { DashboardsModule } from "src/app/pages/dashboards/dashboards.module";
import { SweetalertsComponent } from "src/app/pages/advance-ui/sweetalerts/sweetalerts.component";
import { ScrollbarComponent } from "src/app/pages/advance-ui/scrollbar/scrollbar.component";
import { TourComponent } from "src/app/pages/advance-ui/tour/tour.component";
import { SwipersComponent } from "src/app/pages/advance-ui/swiper/swiper.component";
import { RatingsComponent } from "src/app/pages/advance-ui/ratings/ratings.component";
import { HighlightComponent } from "src/app/pages/advance-ui/highlight/highlight.component";
import { ScrollspyComponent } from "src/app/pages/advance-ui/scrollspy/scrollspy.component";
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