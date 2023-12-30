import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component Pages
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { PasswordCodeComponent } from './password-code/password-code.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginGuard } from '../guards/login/login.guard';

const routes: Routes = [
  {
    path: 'signin', loadChildren: () => import('./auth/signin/signin.module').then(m => m.SigninModule), canActivate:[LoginGuard], data: { roles: ['admin']}
  },
  {
    path: 'signup', loadChildren: () => import('./auth/signup/signup.module').then(m => m.SignupModule), canActivate:[LoginGuard], data: { roles: ['admin']}
  },
  {
    path: 'pass-reset', loadChildren: () => import('./auth/pass-reset/pass-reset.module').then(m => m.PassResetModule), canActivate:[LoginGuard], data: { roles: ['admin']}
  },
  {
    path: 'pass-create', loadChildren: () => import('./auth/pass-create/pass-create.module').then(m => m.PassCreateModule), canActivate:[LoginGuard], data: { roles: ['admin']}
  },
  {
    path: 'lockscreen', loadChildren: () => import('./auth/lockscreen/lockscreen.module').then(m => m.LockscreenModule), canActivate:[LoginGuard], data: { roles: ['admin']}
  },
  {
    path: 'logout', loadChildren: () => import('./auth/logout/logout.module').then(m => m.LogoutModule), canActivate:[LoginGuard], data: { roles: ['admin']}
  },
  {
    path: 'success-msg', loadChildren: () => import('./auth/success-msg/success-msg.module').then(m => m.SuccessMsgModule), canActivate:[LoginGuard], data: { roles: ['admin']}
  },
  {
    path: 'twostep', loadChildren: () => import('./auth/twostep/twostep.module').then(m => m.TwostepModule), canActivate:[LoginGuard], data: { roles: ['admin']}
  },
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
