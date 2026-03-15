import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookiePolicyComponent } from './cookie-policy.component';
import { CookiePolicyRoutingModule } from './cookie-policy-routing.module';

@NgModule({
  declarations: [CookiePolicyComponent],
  imports: [
    CookiePolicyRoutingModule,
    CommonModule
  ]
})
export class CookiePolicyModule {}
