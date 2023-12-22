import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentResultPostParameter } from 'src/app/models/entityParameter/iyzico/paymentResultPostParameter';
import { TsaPaymentParameter } from 'src/app/models/entityParameter/iyzico/tsaPaymentParameter';
import { CancelOrder } from 'src/app/models/libraryModels/iyzico/cancelOrder';
import { RefundingProduct } from 'src/app/models/libraryModels/iyzico/refundingProduct';
import { Order } from 'src/app/models/order/order';
import { ResponseModel } from 'src/app/models/responseModel/responseModel';
import { SingleResponseModel } from 'src/app/models/responseModel/singleResponseModel';
import { SubOrder } from 'src/app/models/subOrder/subOrder';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient : HttpClient) { }

  formScript = signal("")

  tsaPayment(tsaPaymentParameter : TsaPaymentParameter):Observable<SingleResponseModel<string>>{
    console.log("Service gelen veri", tsaPaymentParameter)
    let newPath = environment.apiUrl + "orderPayments/tsaPayment"
    return this.httpClient.post<SingleResponseModel<string>>(newPath, tsaPaymentParameter)
  }

  paymentResult(paymentResultPostParameter : PaymentResultPostParameter):Observable<SingleResponseModel<any>>{
    let newPath = environment.apiUrl + "orderPayments/paymentResult"
    return this.httpClient.post<SingleResponseModel<any>>(newPath, paymentResultPostParameter)
  }

  cancelOrder(cancelOrder : CancelOrder):Observable<SingleResponseModel<any>>{
    console.log("Service gelen order cancelOrder", cancelOrder)
    let newPath = environment.apiUrl + "orderPayments/cancelOrder"
    return this.httpClient.post<SingleResponseModel<any>>(newPath, cancelOrder)
  }

  refundProduct(refundingProduct : RefundingProduct):Observable<SingleResponseModel<any>>{
    console.log("Service gelen order refundingProduct", refundingProduct)
    let newPath = environment.apiUrl + "orderPayments/refundProduct"
    return this.httpClient.post<SingleResponseModel<any>>(newPath, refundingProduct)
  }

  setFormScript(script : string){
    console.log("Signale gelen src", script)
    this.formScript.set(script)
  }


}
