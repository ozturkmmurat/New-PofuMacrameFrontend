import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/category/category';
import { ListResponseModel } from 'src/app/models/responseModel/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel/responseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient : HttpClient) { }

  getAll():Observable<ListResponseModel<Category>>{
    let newPath = environment.apiUrl + "categories/getAll"
    return this.httpClient.get<ListResponseModel<Category>>(newPath);
  }

  add(category : Category):Observable<ResponseModel>{
    console.log("Service gelen category", category)
    let newPath = environment.apiUrl + "categories/add"
    return this.httpClient.post<ResponseModel>(newPath, category)
  }

  update(category : Category):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "categories/update"
    return this.httpClient.post<ResponseModel>(newPath, category)
  }

  delete(category : Category):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "categories/delete"
    return this.httpClient.post<ResponseModel>(newPath, category)
  }
}
