import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PasswordCodeComponent } from "./password-code.component";

const routes: Routes = [
    {
      path: "basic/:codeUrl",
      component: PasswordCodeComponent,
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PasswordCodeRoutingModule { }
  