import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { OrderRoutingModule } from "./order.routing.module";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { OrderDetailComponent } from "./order-detail/order-detail.component";

@NgModule({
    declarations: [
      OrderDetailComponent,
    ],
  imports: [
    OrderRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: []
  })
  export class OrderModule { 
    constructor() {
    }
  }