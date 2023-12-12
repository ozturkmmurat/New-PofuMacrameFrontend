import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', loadChildren: () => import('../shared/ecommerce/home/home.module').then(m => m.HomeModule) } ,
    { path: 'productList', loadChildren: () => import('../shared/ecommerce/product-list/product-list.module').then(m => m.ProductListModule) },
    { path: 'productDetail', loadChildren: () => import('../shared/ecommerce/product-detail/product-detail.module').then(m => m.ProductDetailModule) },
    { path: 'payment', loadChildren: () => import('../shared/ecommerce/payment/payment.module').then(m => m.PaymentModule) },
    { path: 'order', loadChildren: () => import('../shared/ecommerce/order/order.module').then(m => m.OrderModule) },
    { path: 'checkout', loadChildren: () => import('../shared/ecommerce/checkout/checkout.module').then(m => m.CheckoutModule) },
    { path: 'userAccount', loadChildren: () => import('../shared/user-account/user-account.module').then(m => m.UserAccountModule) },

  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class MainLandingRoutingModule { }