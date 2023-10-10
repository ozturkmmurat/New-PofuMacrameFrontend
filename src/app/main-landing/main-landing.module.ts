import { CommonModule } from "@angular/common";
import { MainLandingRoutingModule } from "./main-landing.routing.module";
import { HomeModule } from "../shared/ecommerce/home/home.module";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { MainLandingComponent } from "./main-landing.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbCollapse } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    declarations: [
      MainLandingComponent
  ],
    imports: [
      MainLandingRoutingModule,
      HomeModule,
      NgbCollapse,
      CommonModule
    ],
    schemas:[CUSTOM_ELEMENTS_SCHEMA]
  })
  export class MainLandingModule { }
