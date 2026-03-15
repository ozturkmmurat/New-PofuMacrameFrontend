import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PreInfoCheckComponent } from './pre-info-check.component';
import { PreInfoCheckRoutingModule } from './pre-info-check-routing.module';

@NgModule({
  declarations: [PreInfoCheckComponent],
  imports: [
    PreInfoCheckRoutingModule,
    CommonModule,
    HttpClientModule
  ]
})
export class PreInfoCheckModule {}
