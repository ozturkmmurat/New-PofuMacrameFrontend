import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ProductListComponent } from "./product-list.component";

const routes: Routes = [
    {
      path: 'list',
      component: ProductListComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProductListRoutingModule {}