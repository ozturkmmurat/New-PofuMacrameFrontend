import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ProductDetailComponent } from "./product-detail.component";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SlickCarouselModule } from "ngx-slick-carousel";
import { NgModule } from "@angular/core";
import { ProductDetailRoutingModule } from "./product-detail.routing.module";
import { SimplebarAngularModule } from 'simplebar-angular';

@NgModule({
    declarations: [
      ProductDetailComponent
    ],
  imports: [
    ProductDetailRoutingModule,
    NgbModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    SimplebarAngularModule
  ],
    providers: []
  })
  export class ProductDetailModule { 
    constructor() {
    }
  }