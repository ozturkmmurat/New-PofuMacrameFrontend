import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreInfoCheckComponent } from './pre-info-check.component';

const routes: Routes = [
  { path: '', component: PreInfoCheckComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreInfoCheckRoutingModule {}
