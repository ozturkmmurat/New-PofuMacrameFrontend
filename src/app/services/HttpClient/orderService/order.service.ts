import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/responseModel/listResponseModel';
import { SelectUserOrderDto } from 'src/app/models/dtos/order/select/selectOrderDto';
import { SingleResponseModel } from 'src/app/models/responseModel/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient : HttpClient) { }

  getAllUserOrderDto():Observable<ListResponseModel<SelectUserOrderDto>>{
    let newPath = environment.apiUrl + "orders/getAllUserOrderDto"
    return this.httpClient.get<ListResponseModel<SelectUserOrderDto>>(newPath);
  }

  getUserOrderDtoDetail(orderId : number):Observable<SingleResponseModel<SelectUserOrderDto>>{
    let newPath = environment.apiUrl + "orders/getUserOrderDtoDetail?orderId=" + orderId
    return this.httpClient.get<SingleResponseModel<SelectUserOrderDto>>(newPath);
  }
}
