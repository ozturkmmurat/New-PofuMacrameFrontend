import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component Pages
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { PasswordCodeComponent } from './password-code/password-code.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginGuard } from '../core/guards/login/login.guard';

const routes: Routes = [
  {
    path: 'errors', loadChildren: () => import('./auth/errors/errors.module').then(m => m.ErrorsModule), canActivate:[LoginGuard], data: { roles: ['admin']}
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "forgot-password", loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule)
  },
  {
    path: "password-code", loadChildren: () => import('./password-code/password-code.module').then(m => m.PasswordCodeModule)
  },
  {
    path: "password-reset", loadChildren: () => import('./password-reset/password-reset.module').then(m => m.PasswordResetModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
