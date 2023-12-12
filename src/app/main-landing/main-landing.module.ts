import { CommonModule } from "@angular/common";
import { MainLandingRoutingModule } from "./main-landing.routing.module";
import { HomeModule } from "../shared/ecommerce/home/home.module";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { MainLandingComponent } from "./main-landing.component";
import { NgbCollapseModule, NgbDropdownModule, NgbModule, NgbNavModule } from "@ng-bootstrap/ng-bootstrap";
import { SimplebarAngularModule } from "simplebar-angular";
import { CartComponent } from "./pages/cart/cart.component";
import { NavbarComponent } from "./layouts/navbar/navbar.component";
import { FooterComponent } from "./layouts/footer/footer.component";


@NgModule({
  declarations: [
    MainLandingComponent,
    CartComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    MainLandingRoutingModule,
    HomeModule,
    NgbCollapseModule,
    CommonModule,
    SimplebarAngularModule,
    NgbNavModule,
    NgbModule,
    NgbDropdownModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MainLandingModule { }
