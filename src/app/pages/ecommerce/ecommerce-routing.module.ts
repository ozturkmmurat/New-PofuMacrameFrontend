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
    path:"attributes",
    component: AttributesComponent
  },
  {
    path: "orders",
    component: OrdersComponent
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
//burada lazy yok bu template in yaptığı burayı düzenelyecektim ama gereksiz component çoktu onları temizlemekle uğraştım ve hata falan veriyor çok kütühpaen var neyi çıkaracağımı kestiremiyorum
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EcommerceRoutingModule {}
