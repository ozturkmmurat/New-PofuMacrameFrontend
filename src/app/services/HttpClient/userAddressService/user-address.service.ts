import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ResponseModel } from 'src/app/models/responseModel/responseModel';
import { UserAddress } from 'src/app/models/userAddress/userAddress';
import { SingleResponseModel } from 'src/app/models/responseModel/singleResponseModel';
import { ListResponseModel } from 'src/app/models/responseModel/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class UserAddressService {

  constructor(private httpClient : HttpClient) { }

  getUserAddresses():Observable<ListResponseModel<UserAddress>>{
    let newPath = environment.apiUrl + "userAdresses/getUserAddresses"
    return this.httpClient.get<ListResponseModel<UserAddress>>(newPath)
  }

  add(userAddress : UserAddress):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "userAdresses/add"
    return this.httpClient.post<ResponseModel>(newPath, userAddress)
  }

  update(userAddress : UserAddress):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "userAdresses/update"
    return this.httpClient.post<ResponseModel>(newPath, userAddress)
  }

  delete(userAddress : UserAddress):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "userAdresses/delete"
    return this.httpClient.post<ResponseModel>(newPath, userAddress)
  }
}
