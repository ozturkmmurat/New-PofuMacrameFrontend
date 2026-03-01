import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ListResponseModel } from 'src/app/models/responseModel/listResponseModel';
import { SelectUserOrderDto } from 'src/app/models/dtos/order/select/selectOrderDto';
import { SingleResponseModel } from 'src/app/models/responseModel/singleResponseModel';
import { ResponseModel } from 'src/app/models/responseModel/responseModel';
import { Order } from 'src/app/models/order/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient : HttpClient) { }

  getAll():Observable<ListResponseModel<Order>>{
    let newPath = environment.apiUrl + "orders/getAll"
    return this.httpClient.get<ListResponseModel<Order>>(newPath);
  }

  getAllUserOrderDto():Observable<ListResponseModel<SelectUserOrderDto>>{
    let newPath = environment.apiUrl + "orders/getAllUserOrderDto"
    return this.httpClient.get<ListResponseModel<SelectUserOrderDto>>(newPath);
  }

  getAllUserOrderDtoAdmin():Observable<ListResponseModel<SelectUserOrderDto>>{
    let newPath = environment.apiUrl + "orders/getAllUserOrderDtoAdmin"
    return this.httpClient.get<ListResponseModel<SelectUserOrderDto>>(newPath);
  }

  getUserOrderDtoDetail(orderId : number, userId : number):Observable<SingleResponseModel<SelectUserOrderDto>>{
    let newPath = environment.apiUrl + "orders/getUserOrderDtoDetail?orderId=" + orderId + "&userId=" + userId
    return this.httpClient.get<SingleResponseModel<SelectUserOrderDto>>(newPath);
  }

  markAsShipped(order: Order): Observable<ResponseModel> {
    const newPath = environment.apiUrl + 'orders/MarkAsShipped';
    return this.httpClient.post<ResponseModel>(newPath, order);
  }

  getByGuid(guid: string): Observable<SingleResponseModel<Order>> {
    const newPath = environment.apiUrl + 'orders/GetByGuid?guid=' + encodeURIComponent(guid);
    return this.httpClient.get<SingleResponseModel<Order>>(newPath);
  }
}
