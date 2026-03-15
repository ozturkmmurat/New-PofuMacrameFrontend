import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KvkkComponent } from './kvkk.component';
import { KvkkRoutingModule } from './kvkk-routing.module';

@NgModule({
  declarations: [KvkkComponent],
  imports: [
    KvkkRoutingModule,
    CommonModule
  ]
})
export class KvkkModule {}
