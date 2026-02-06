import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layouts/layout.component';

// Auth
import { MainLandingComponent } from './main-landing/main-landing.component';
import { LoginGuard } from './guards/login/login.guard';

const routes: Routes = [
  { path: '', component: MainLandingComponent, loadChildren: () => import('./main-landing/main-landing.module').then(m => m.MainLandingModule)},
  { path: 'admin', component: LayoutComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule), canActivate:[LoginGuard], data: { roles: ['admin']}},
  { path: 'auth', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)  },
  { path: 'pages', loadChildren: () => import('./extraspages/extraspages.module').then(m => m.ExtraspagesModule), canActivate:[LoginGuard], data: { roles: ['admin']} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
