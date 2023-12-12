import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentResultPostParameter } from 'src/app/models/entityParameter/iyzico/paymentResultPostParameter';
import { TsaPaymentParameter } from 'src/app/models/entityParameter/iyzico/tsaPaymentParameter';
import { ResponseModel } from 'src/app/models/responseModel/responseModel';
import { SingleResponseModel } from 'src/app/models/responseModel/singleResponseModel';
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
    console.log("Service gelen", paymentResultPostParameter)
    let newPath = environment.apiUrl + "orderPayments/paymentResult"
    return this.httpClient.post<SingleResponseModel<any>>(newPath, paymentResultPostParameter)
  }

  setFormScript(script : string){
    console.log("Signale gelen src", script)
    this.formScript.set(script)
  }


}
