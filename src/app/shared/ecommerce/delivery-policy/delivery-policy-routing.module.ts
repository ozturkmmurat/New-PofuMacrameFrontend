import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryPolicyComponent } from './delivery-policy.component';

const routes: Routes = [
  { path: '', component: DeliveryPolicyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryPolicyRoutingModule {}
