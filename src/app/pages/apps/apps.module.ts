import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbTooltipModule, NgbDropdownModule, NgbTypeaheadModule, NgbAccordionModule, NgbProgressbarModule, NgbNavModule, NgbPaginationModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

// search module
import { NgPipesModule } from 'ngx-pipes';

// Feather Icon
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

// Calendar package
import { FullCalendarModule } from '@fullcalendar/angular';
// Flat Picker
import { FlatpickrModule } from 'angularx-flatpickr';
// Simplebar
import { SimplebarAngularModule } from 'simplebar-angular';
// Ck Editer
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
// Counter
import { CountUpModule } from 'ngx-countup';
// Apex Chart Package
import { LeafletModule } from '@asymmetrik/ngx-leaflet';



//  Drag and drop
import { DndModule } from 'ngx-drag-drop';

// Drag and Droup Row
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTableModule } from '@angular/material/table';

// Select Droup down
import { NgSelectModule } from '@ng-select/ng-select';

// Component Pages
import { AppsRoutingModule } from "./apps-routing.module";
import { SharedModule } from '../../shared/shared.module';
// Load Icon
import { defineElement } from 'lord-icon-element';
import lottie from 'lottie-web';

import { DatePipe } from '@angular/common';
// Mask
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask, IConfig } from 'ngx-mask';

// Swiper Slider
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    NgbDropdownModule,
    NgbAccordionModule,
    NgbProgressbarModule,
    NgbNavModule,
    NgbPaginationModule,
    NgbCollapseModule,
    NgPipesModule,
    FeatherModule.pick(allIcons),
    FullCalendarModule,
    FlatpickrModule.forRoot(),
    SimplebarAngularModule,
    CKEditorModule,
    CountUpModule,
    LeafletModule,
    AppsRoutingModule,
    SharedModule,
    DndModule,
    DragDropModule,
    MatTableModule,
    NgSelectModule,
    NgbTypeaheadModule,
    SlickCarouselModule,
    NgxMaskDirective, NgxMaskPipe
  ],
  providers:[
    provideNgxMask(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppsModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
