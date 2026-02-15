import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { District } from 'src/app/models/district/district';
import { ListResponseModel } from 'src/app/models/responseModel/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel/responseModel';
import { SingleResponseModel } from 'src/app/models/responseModel/singleResponseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {

  private readonly baseUrl = environment.apiUrl + 'districts/';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ListResponseModel<District>> {
    return this.httpClient.get<ListResponseModel<District>>(this.baseUrl + 'getAll');
  }

  getAllAsNoTracking(): Observable<ListResponseModel<District>> {
    return this.httpClient.get<ListResponseModel<District>>(this.baseUrl + 'getAllAsNoTracking');
  }

  getById(id: number): Observable<SingleResponseModel<District>> {
    return this.httpClient.get<SingleResponseModel<District>>(this.baseUrl + 'getById?id=' + id);
  }

  add(district: District): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.baseUrl + 'add', district);
  }

  update(district: District): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.baseUrl + 'update', district);
  }

  delete(district: District): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.baseUrl + 'delete', district);
  }
}
