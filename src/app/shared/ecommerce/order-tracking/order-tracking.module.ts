import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { OrderTrackingComponent } from './order-tracking.component';
import { OrderTrackingRoutingModule } from './order-tracking.routing.module';

@NgModule({
  declarations: [OrderTrackingComponent],
  imports: [
    OrderTrackingRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule
  ]
})
export class OrderTrackingModule {
  constructor() {}
}

