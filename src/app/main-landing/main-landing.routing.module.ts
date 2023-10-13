import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', loadChildren: () => import('../shared/ecommerce/home/home.module').then(m => m.HomeModule) } ,
    { path: '', loadChildren: () => import('../shared/ecommerce/product-list/product-list.module').then(m => m.ProductListModule) }  ,
    { path: '', loadChildren: () => import('../shared/ecommerce/product-detail/product-detail.module').then(m => m.ProductDetailModule) }  
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class MainLandingRoutingModule { }