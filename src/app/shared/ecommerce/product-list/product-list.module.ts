import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { NgbModule, NgbNavModule, NgbAccordionModule} from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProductListComponent } from "./product-list.component";
import { ProductListRoutingModule } from "./product-list-routing.module";
import { NgxSliderModule } from "ngx-slider-v2";

@NgModule({
    declarations: [
      ProductListComponent
    ],
  imports: [
    ProductListRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbAccordionModule,
    NgxSliderModule,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
    providers: []
  })
  export class ProductListModule { 
    constructor() {
    }
  }