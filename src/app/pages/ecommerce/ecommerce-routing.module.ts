import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component pages
import { ProductsComponent } from "./products/products.component";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { AddProductComponent } from "./add-product/add-product.component";
import { OrdersComponent } from "./orders/orders.component";
import { OrdersDetailsComponent } from "./orders-details/orders-details.component";
import { CustomersComponent } from "./customers/customers.component";
import { CartComponent } from "./cart/cart.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { SellerDetailsComponent } from "./seller-details/seller-details.component";
import { ProductListComponent } from './product-list/product-list.component';
import { CategoriesComponent } from './categories/categories.component';
import { AttributesComponent } from './attributes/attributes.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderedProductsComponent } from './ordered-products/ordered-products.component';
import { ProductPricefactorComponent } from './product-pricefactor/product-pricefactor.component';
import { DistrictComponent } from './district/district.component';

const routes: Routes = [
  {
    path: "products",
    component: ProductsComponent
  },
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
    path:"categories",
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
    path: "orders",
    component: OrdersComponent
  },
  {
    path:"orderList",
    component:OrderListComponent
  },
  {
    path:"orderDetail/:orderId/:userId",
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
    path: "customers",
    component: CustomersComponent
  },
  {
    path: "cart",
    component: CartComponent
  },
  {
    path: "checkout",
    component: CheckoutComponent
  },
  {
    path: "seller-details",
    component: SellerDetailsComponent
  }

];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EcommerceRoutingModule {}
