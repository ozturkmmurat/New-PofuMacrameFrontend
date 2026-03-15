import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { FaqComponent } from './faq.component';
import { FaqRoutingModule } from './faq-routing.module';

@NgModule({
  declarations: [FaqComponent],
  imports: [
    FaqRoutingModule,
    CommonModule,
    HttpClientModule,
    NgbAccordionModule
  ]
})
export class FaqModule {}
