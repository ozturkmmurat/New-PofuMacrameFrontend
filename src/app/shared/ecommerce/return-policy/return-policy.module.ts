import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReturnPolicyComponent } from './return-policy.component';
import { ReturnPolicyRoutingModule } from './return-policy-routing.module';

@NgModule({
  declarations: [ReturnPolicyComponent],
  imports: [
    ReturnPolicyRoutingModule,
    CommonModule
  ]
})
export class ReturnPolicyModule {}
