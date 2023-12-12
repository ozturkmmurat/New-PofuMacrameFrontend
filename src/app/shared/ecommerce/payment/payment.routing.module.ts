import { RouterModule, Routes } from "@angular/router";
import { CardPaymentComponent } from "./card-payment/card-payment.component";
import { NgModule } from "@angular/core";
import { PaymentStatusComponent } from "./payment-status/payment-status.component";

const routes: Routes = [
    {
      path: 'paymentStatus/:orderId',
      component: PaymentStatusComponent
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PaymentRoutingModule {}