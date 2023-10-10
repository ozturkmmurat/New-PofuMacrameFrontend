import { NgModule } from "@angular/core";
import { HomeComponent } from "./home.component";
import { HomeRoutingModule } from "./home-routing.module";

@NgModule({
    declarations: [
      HomeComponent
    ],
    imports: [
      HomeRoutingModule // HomeRoutingModule'i burada import et
    ],
    providers: []
  })
  export class HomeModule { 
    constructor() {
    }
  }