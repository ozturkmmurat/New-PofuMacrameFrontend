import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AttributeValue } from 'src/app/models/attributeValue/attributeValue';
import { ListResponseModel } from 'src/app/models/responseModel/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel/responseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttributeValueService {

  constructor(private httpClient : HttpClient) { }

  getAllByAttributeId(attributeId : number):Observable<ListResponseModel<AttributeValue>>{
    let newPath = environment.apiUrl + "attributeValues/getAllByAttributeId?attributeId="+ attributeId
    return this.httpClient.get<ListResponseModel<AttributeValue>>(newPath)
  }

  add(attributeValue : AttributeValue):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "attributeValues/add"
    return this.httpClient.post<ResponseModel>(newPath, attributeValue)
  }

  update(attributeValue : AttributeValue):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "attributeValues/update"
    return this.httpClient.post<ResponseModel>(newPath, attributeValue)
  }

  delete(attributeValue : AttributeValue):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "attributeValues/delete"
    return this.httpClient.post<ResponseModel>(newPath, attributeValue)
  }
}
