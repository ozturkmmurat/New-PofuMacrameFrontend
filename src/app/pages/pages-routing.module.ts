import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './ecommerce/products/products.component';

const routes: Routes = [
    {
        path: "",
        component: ProductsComponent
    },
    {
      path: 'apps', loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule)
    },
    {
      path: '', loadChildren: () => import('./ecommerce/ecommerce.module').then(m => m.EcommerceModule)
    },
    {
      path: 'advance-ui', loadChildren: () => import('./advance-ui/advance-ui.module').then(m => m.AdvanceUiModule)
    },
    {
      path: 'forms', loadChildren: () => import('./form/form.module').then(m => m.FormModule)
    },
    {
      path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule)
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
