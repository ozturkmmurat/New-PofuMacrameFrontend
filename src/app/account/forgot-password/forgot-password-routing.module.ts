import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ForgotPasswordComponent } from "./forgot-password.component";

const routes: Routes = [
    {
      path: "basic",
      component: ForgotPasswordComponent
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ForgotPasswordRoutingModule { }
  