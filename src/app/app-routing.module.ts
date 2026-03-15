import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layouts/layout.component';
import { MainLandingComponent } from './main-landing/main-landing.component';
import { LoginGuard } from './core/guards/login/login.guard';

const routes: Routes = [
  { path: '', component: MainLandingComponent, loadChildren: () => import('./main-landing/main-landing.routing.module').then(m => m.MainLandingRoutingModule)},
  { path: 'admin', component: LayoutComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule), canActivate:[LoginGuard], data: { roles: ['admin']}},
  { path: 'auth', component: MainLandingComponent, loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  { path: 'pages', loadChildren: () => import('./extraspages/extraspages.module').then(m => m.ExtraspagesModule), canActivate:[LoginGuard], data: { roles: ['admin']} },
  { path: '404', component: MainLandingComponent, loadChildren: () => import('./account/auth/errors/errors.module').then(m => m.ErrorsModule) },
  { path: '**', redirectTo: '404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
