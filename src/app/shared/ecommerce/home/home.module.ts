import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { HomeRoutingModule } from "./home-routing.module";
import { NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SlickCarouselModule } from "ngx-slick-carousel";


@NgModule({
    declarations: [
      HomeComponent
    ],
  imports: [
    HomeRoutingModule,
    NgbModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SlickCarouselModule
  ],
    providers: []
  })
  export class HomeModule { 
    constructor() {
    }
  }