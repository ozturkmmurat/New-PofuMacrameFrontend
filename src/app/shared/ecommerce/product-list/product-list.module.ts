import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { NgbModule, NgbNavModule, NgbAccordionModule, NgbDropdownModule, NgbPaginationModule, NgbTypeaheadModule, NgbRatingModule, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProductListComponent } from "./product-list.component";
import { ProductListRoutingModule } from "./product-list-routing.module";
// Swiper Slider
import { SlickCarouselModule } from 'ngx-slick-carousel';
// Counter
import { CountUpModule } from 'ngx-countup';
import { NgxSliderModule } from "ngx-slider-v2";
import { SimplebarAngularModule } from "simplebar-angular";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { DropzoneModule } from "ngx-dropzone-wrapper";
import { FlatpickrModule } from "angularx-flatpickr";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgApexchartsModule } from "ng-apexcharts";
import { SharedModule } from "../../shared.module";
import { NgxMaskDirective, NgxMaskPipe } from "ngx-mask";

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