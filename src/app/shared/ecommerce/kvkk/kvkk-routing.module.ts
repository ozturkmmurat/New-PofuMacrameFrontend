import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KvkkComponent } from './kvkk.component';

const routes: Routes = [
  { path: '', component: KvkkComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KvkkRoutingModule {}
