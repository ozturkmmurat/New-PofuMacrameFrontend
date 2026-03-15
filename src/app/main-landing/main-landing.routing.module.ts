import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../core/guards/login/login.guard';

const routes: Routes = [
    { path: '', loadChildren: () => import('../shared/ecommerce/home/home.module').then(m => m.HomeModule) } ,
    { path: 'contact', loadChildren: () => import('../shared/ecommerce/contact/contact.module').then(m => m.ContactModule) },
    { path: 'distanceSalesCheck', loadChildren: () => import('../shared/ecommerce/distance-sales-check/distance-sales-check.module').then(m => m.DistanceSalesCheckModule) },
    { path: 'preInfoCheck', loadChildren: () => import('../shared/ecommerce/pre-info-check/pre-info-check.module').then(m => m.PreInfoCheckModule) },
    { path: 'kvkk', loadChildren: () => import('../shared/ecommerce/kvkk/kvkk.module').then(m => m.KvkkModule) },
    { path: 'cookie-policy', loadChildren: () => import('../shared/ecommerce/cookie-policy/cookie-policy.module').then(m => m.CookiePolicyModule) },
    { path: 'return-policy', loadChildren: () => import('../shared/ecommerce/return-policy/return-policy.module').then(m => m.ReturnPolicyModule) },
    { path: 'delivery-policy', loadChildren: () => import('../shared/ecommerce/delivery-policy/delivery-policy.module').then(m => m.DeliveryPolicyModule) },
    { path: 'faq', loadChildren: () => import('../shared/ecommerce/faq/faq.module').then(m => m.FaqModule) },
    { path: 'productList', loadChildren: () => import('../shared/ecommerce/product-list/product-list.module').then(m => m.ProductListModule) },
    { path: 'productDetail', loadChildren: () => import('../shared/ecommerce/product-detail/product-detail.module').then(m => m.ProductDetailModule) },
    { path: 'payment', loadChildren: () => import('../shared/ecommerce/payment/payment.module').then(m => m.PaymentModule) },
    { path: 'checkout', loadChildren: () => import('../shared/ecommerce/checkout/checkout.module').then(m => m.CheckoutModule) },
    { path: 'orderTracking', loadChildren: () => import('../shared/ecommerce/order-tracking/order-tracking.module').then(m => m.OrderTrackingModule) },
    { path: 'userAccount', loadChildren: () => import('../shared/user-account/user-account.module').then(m => m.UserAccountModule), canActivate:[LoginGuard], data: { roles: ['user','admin']} },

  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class MainLandingRoutingModule { }