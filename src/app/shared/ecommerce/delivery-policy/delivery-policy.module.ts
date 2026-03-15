import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryPolicyComponent } from './delivery-policy.component';
import { DeliveryPolicyRoutingModule } from './delivery-policy-routing.module';

@NgModule({
  declarations: [DeliveryPolicyComponent],
  imports: [
    DeliveryPolicyRoutingModule,
    CommonModule
  ]
})
export class DeliveryPolicyModule {}
