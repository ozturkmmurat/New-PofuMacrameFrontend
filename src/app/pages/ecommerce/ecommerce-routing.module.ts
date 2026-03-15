import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component pages
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { AddProductComponent } from "./add-product/add-product.component";
import { OrdersDetailsComponent } from "./orders-details/orders-details.component";
import { CartComponent } from "./cart/cart.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { ProductListComponent } from './product-list/product-list.component';
import { CategoriesComponent } from './categories/categories.component';
import { AttributesComponent } from './attributes/attributes.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderedProductsComponent } from './ordered-products/ordered-products.component';
import { ProductPricefactorComponent } from './product-pricefactor/product-pricefactor.component';
import { DistrictComponent } from './district/district.component';
import { SiteContentsComponent } from './site-contents/site-contents.component';

const routes: Routes = [
  {
    path:"productList",
    component: ProductListComponent
  },
  {
    path: "product-detail/:productId",
    component: ProductDetailComponent
  },
  {
    path: "add-product",
    component: AddProductComponent
  },
  {
    path: "categories",
    component: CategoriesComponent
  },
  {
    path: "attributes",
    component: AttributesComponent
  },
  {
    path: "product-pricefactor",
    component: ProductPricefactorComponent
  },
  {
    path: "district",
    component: DistrictComponent
  },
  {
    path: "site-contents",
    component: SiteContentsComponent
  },
  {
    path:"orderList",
    component:OrderListComponent
  },
  {
    path: "orderDetail/:guid",
    component: OrderDetailComponent
  },
  {
    path:"orderedProducts",
    component: OrderedProductsComponent
  },
  {
    path: "order-details",
    component: OrdersDetailsComponent
  },
  {
    path: "cart",
    component: CartComponent
  },
  {
    path: "checkout",
    component: CheckoutComponent
  }

];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EcommerceRoutingModule {}
