import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Attribute } from 'src/app/models/attribute/attribute';
import { ListResponseModel } from 'src/app/models/responseModel/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel/responseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  constructor(private httpClient : HttpClient) { }

  getAll():Observable<ListResponseModel<Attribute>>{
    let newPath = environment.apiUrl + "attributes/getAll"
    return this.httpClient.get<ListResponseModel<Attribute>>(newPath)
  }

  add(attribute : Attribute):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "attributes/add"
    return this.httpClient.post<ResponseModel>(newPath, attribute)
  }

  update(attribute : Attribute):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "attributes/update"
    return this.httpClient.post<ResponseModel>(newPath, attribute)
  }

  delete(attribute : Attribute):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "attributes/delete"
    return this.httpClient.post<ResponseModel>(newPath, attribute)
  }
}
