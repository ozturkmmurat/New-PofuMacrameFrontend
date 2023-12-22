import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbPaginationModule, NgbTypeaheadModule, NgbDropdownModule, NgbNavModule, NgbAccordionModule, NgbRatingModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

// Mask
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask, IConfig } from 'ngx-mask'

// Range Slider
import { NgxSliderModule } from 'ngx-slider-v2';
// Simple bar
import { SimplebarAngularModule } from 'simplebar-angular';
// Swiper Slider
import { SlickCarouselModule } from 'ngx-slick-carousel';

// Ck Editer
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
// File Uploads
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
// Flat Picker
import { FlatpickrModule } from 'angularx-flatpickr';
// Ng Select
import { NgSelectModule } from '@ng-select/ng-select';

// Count
import { CountUpModule } from 'ngx-countup';

// Load Icon
import { defineElement } from 'lord-icon-element';
import lottie from 'lottie-web';

// Component Pages
import { EcommerceRoutingModule } from './ecommerce-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AddProductComponent } from './add-product/add-product.component';
import { OrdersComponent } from './orders/orders.component';
import { OrdersDetailsComponent } from './orders-details/orders-details.component';
import { CustomersComponent } from './customers/customers.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SellerDetailsComponent } from './seller-details/seller-details.component';
import { NgbdProductsSortableHeader } from './products/products-sortable.directive';
import { NgbdOrdersSortableHeader } from './orders/orders-sortable.directive';
import {NgbdCustomerSortableHeader} from './customers/customers-sortable.directive';
import {NgbdSellersSortableHeader} from './seller-details/seller-details-sortable.directive'

import { DatePipe } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AddProductVariantComponent } from './add-product-variant/add-product-variant.component';
import { AttributeValueComponent } from './attribute-value/attribute-value.component';
import { AttributesComponent } from './attributes/attributes.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryAttributeComponent } from './category-attribute/category-attribute.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductImagesComponent } from './product-images/product-images.component';
import { UpdateProductStockComponent } from './update-product-stock/update-product-stock.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderedProductsComponent } from './ordered-products/ordered-products.component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
   url: 'https://httpbin.org/post',
   maxFilesize: 50,
   acceptedFiles: 'image/*,.mp4,.mkv,.avi, .webp',
   addRemoveLinks: true,
 };


@NgModule({
  declarations: [
    ProductsComponent,
    ProductDetailComponent,
    AddProductComponent,
    OrdersComponent,
    OrdersDetailsComponent,
    CustomersComponent,
    CartComponent,
    CheckoutComponent,
    SellerDetailsComponent,
    NgbdProductsSortableHeader,
    NgbdOrdersSortableHeader,
    NgbdCustomerSortableHeader,
    NgbdSellersSortableHeader,
    AddProductVariantComponent,
    AttributeValueComponent,
    AttributesComponent,
    CategoriesComponent,
    CategoryAttributeComponent,
    ProductListComponent,
    ProductImagesComponent,
    UpdateProductStockComponent,
    OrderListComponent,
    OrderDetailComponent,
    OrderedProductsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbAccordionModule,
    NgbRatingModule,
    NgbTooltipModule,
    NgxSliderModule,
    SimplebarAngularModule,
    SlickCarouselModule,
    CKEditorModule,
    DropzoneModule,
    FlatpickrModule.forRoot(),
    NgSelectModule,
    CountUpModule,
    EcommerceRoutingModule,
    SharedModule,
    NgxMaskDirective,
    NgxMaskPipe,
    NgxDatatableModule
  ],
  providers: [
    provideNgxMask(),
    DatePipe,
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EcommerceModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
