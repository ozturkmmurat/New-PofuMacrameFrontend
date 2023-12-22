import { NgModule } from "@angular/core";
import { PasswordResetComponent } from "./password-reset.component";
import { PasswordResetRoutingModule } from "./password-reset-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbCarouselModule } from "@ng-bootstrap/ng-bootstrap";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
      PasswordResetComponent,
    ],
    imports: [
      CommonModule,
      NgbCarouselModule,
      ReactiveFormsModule,
      FormsModule,
      PasswordResetRoutingModule
    ]
  })
  export class PasswordResetModule { 
    
  }