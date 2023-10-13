import { RouterModule, Routes } from "@angular/router";
import { ProductDetailComponent } from "./product-detail.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
      path: 'product-detail/:productId/:productVariantId',
      component: ProductDetailComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class ProductDetailRoutingModule {}