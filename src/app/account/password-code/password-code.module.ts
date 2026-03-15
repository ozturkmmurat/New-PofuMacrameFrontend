import { NgModule } from "@angular/core";
import { PasswordCodeComponent } from "./password-code.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgbCarouselModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgOtpInputModule } from "ng-otp-input";
import { PasswordCodeRoutingModule } from "./password-code-routing.module";

@NgModule({
    declarations: [
        PasswordCodeComponent
    ],
    imports: [
      CommonModule,
      RouterModule,
      NgbCarouselModule,
      ReactiveFormsModule,
      FormsModule,
      NgOtpInputModule,
      PasswordCodeRoutingModule
    ]
  })
  export class PasswordCodeModule { }