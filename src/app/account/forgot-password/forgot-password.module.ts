import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { ForgotPasswordComponent } from "./forgot-password.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgbCarouselModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { defineElement } from "lord-icon-element";
import lottie from 'lottie-web';
import { ForgotPasswordRoutingModule } from "./forgot-password-routing.module";

@NgModule({
    declarations: [
      ForgotPasswordComponent,
    ],
    imports: [
      CommonModule,
      RouterModule,
      NgbCarouselModule,
      ReactiveFormsModule,
      FormsModule,
      ForgotPasswordRoutingModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  })
  export class ForgotPasswordModule {
    constructor() {
      defineElement(lottie.loadAnimation);
    }
   }