import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DistanceSalesCheckComponent } from './distance-sales-check.component';
import { DistanceSalesCheckRoutingModule } from './distance-sales-check-routing.module';

@NgModule({
  declarations: [DistanceSalesCheckComponent],
  imports: [
    DistanceSalesCheckRoutingModule,
    CommonModule,
    HttpClientModule
  ]
})
export class DistanceSalesCheckModule {}
