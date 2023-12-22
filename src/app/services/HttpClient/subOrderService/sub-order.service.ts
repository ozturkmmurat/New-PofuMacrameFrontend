import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { SelectOrderedProductDto } from 'src/app/models/dtos/subOrder/select/selectOrderedProduct';
import { ListResponseModel } from 'src/app/models/responseModel/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class SubOrderService {

  constructor(private httpClient : HttpClient) { }

  getAllOrderedProduct():Observable<ListResponseModel<SelectOrderedProductDto>>{
    let newPath = environment.apiUrl + "subOrders/getAllOrderedProduct"
    return this.httpClient.get<ListResponseModel<SelectOrderedProductDto>>(newPath);
  }

}
