import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OrderDetailComponent } from "./order-detail/order-detail.component";

const routes: Routes = [
    {
      path: 'orderDetail',
      component: OrderDetailComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class OrderRoutingModule {}