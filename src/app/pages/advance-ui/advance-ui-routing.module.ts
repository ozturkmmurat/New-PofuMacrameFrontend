import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component pages
import { SweetalertsComponent } from "./sweetalerts/sweetalerts.component";
import { ScrollbarComponent } from "./scrollbar/scrollbar.component";
import { TourComponent } from "./tour/tour.component";
import { RatingsComponent } from "./ratings/ratings.component";
import { HighlightComponent } from "./highlight/highlight.component";

const routes: Routes = [
  {
    path: "sweetalerts",
    component: SweetalertsComponent
  },
  {
    path: "scrollbar",
    component: ScrollbarComponent
  },
  {
    path: "tour",
    component: TourComponent
  },
  {
    path: "ratings",
    component: RatingsComponent
  },
  {
    path: "highlight",
    component: HighlightComponent
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AsvanceUiRoutingModule {}
