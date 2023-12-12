import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { UserAccountComponent } from "./user-account.component";
import { UserOrderDetailComponent } from "./user-order-detail/user-order-detail.component";

const routes: Routes = [
    {
      path: 'myaccount',
      component: UserAccountComponent
    },
    {
      path:'orderDetail/:orderId',
      component: UserOrderDetailComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class UserAccountRoutingModule {}