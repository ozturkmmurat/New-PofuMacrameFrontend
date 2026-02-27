import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SiteContent } from 'src/app/models/siteContent/siteContent';
import { ListResponseModel } from 'src/app/models/responseModel/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel/responseModel';
import { environment } from 'src/environments/environment';
import { SingleResponseModel } from 'src/app/models/responseModel/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class SiteContentService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ListResponseModel<SiteContent>> {
    const newPath = environment.apiUrl + 'SiteContents/GetAll';
    return this.httpClient.get<ListResponseModel<SiteContent>>(newPath);
  }

  getById(id: number): Observable<SingleResponseModel<SiteContent>> {
    console.log("Service id", id)
    let newPath = environment.apiUrl + "SiteContents/GetById?id=" + id
    return this.httpClient.get<SingleResponseModel<SiteContent>>(newPath);
  }

  getAllByContentKey(contentKey: string): Observable<ListResponseModel<SiteContent>> {
    let newPath = environment.apiUrl + "SiteContents/GetAllByContentKey?contentKey=" + encodeURIComponent(contentKey);
    return this.httpClient.get<ListResponseModel<SiteContent>>(newPath);
  }

  add(formData: FormData): Observable<ResponseModel> {
    const newPath = environment.apiUrl + 'SiteContents/Add';
    return this.httpClient.post<ResponseModel>(newPath, formData);
  }

  update(formData: FormData): Observable<ResponseModel> {
    const newPath = environment.apiUrl + 'SiteContents/Update';
    return this.httpClient.post<ResponseModel>(newPath, formData);
  }

  delete(siteContent: SiteContent): Observable<ResponseModel> {
    const newPath = environment.apiUrl + 'SiteContents/Delete';
    return this.httpClient.post<ResponseModel>(newPath, siteContent);
  }
}
