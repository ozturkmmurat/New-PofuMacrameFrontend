import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DistanceSalesCheckComponent } from './distance-sales-check.component';

const routes: Routes = [
  { path: '', component: DistanceSalesCheckComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistanceSalesCheckRoutingModule {}
