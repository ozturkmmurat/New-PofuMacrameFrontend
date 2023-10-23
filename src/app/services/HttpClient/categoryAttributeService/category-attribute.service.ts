import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryAttribute } from 'src/app/models/categoryAttribute/categoryAttribute';
import { FilterCategoryAttributeDto } from 'src/app/models/dtos/categoryAttribute/filterCategoryAttributeDto';
import { ViewCategoryAttributeDto } from 'src/app/models/dtos/categoryAttribute/select/ViewCategoryAttributeDto';
import { SelectCategoryAttributeDto } from 'src/app/models/dtos/categoryAttribute/select/selectCategoryAttributeDto';
import { ListResponseModel } from 'src/app/models/responseModel/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel/responseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryAttributeService {

  constructor(private httpClient : HttpClient) { }

  getAllTrueSlicerAttribute(categoryId : number):Observable<ListResponseModel<ViewCategoryAttributeDto>>{
    console.log("Service gelen id", categoryId)
    let newPath = environment.apiUrl + "categoryAttributes/getAllViewDtoTrueSlicerAttribute?categoryId="+ categoryId;
    return this.httpClient.get<ListResponseModel<ViewCategoryAttributeDto>>(newPath);
  }

  getAllByCategoryId(categoryId : number):Observable<ListResponseModel<SelectCategoryAttributeDto>>{
    let newPath = environment.apiUrl + "categoryAttributes/getAllSlctCategoryByCategoryId?categoryId="+categoryId
    return this.httpClient.get<ListResponseModel<SelectCategoryAttributeDto>>(newPath)
  }

  getAllCategoryAttributeFilter(categoryId:number):Observable<ListResponseModel<FilterCategoryAttributeDto>>{
    let newPath = environment.apiUrl + "categoryAttributes/getAllCategoryAttributeFilter?categoryId=" + categoryId
    return this.httpClient.get<ListResponseModel<FilterCategoryAttributeDto>>(newPath)
  }

  add(categoryAttribute : CategoryAttribute):Observable<ResponseModel>{
    console.log("Service gelen", categoryAttribute)
    let newPath = environment.apiUrl + "categoryAttributes/add"
    return this.httpClient.post<ResponseModel>(newPath, categoryAttribute)
  }

  update(categoryAttribute : CategoryAttribute):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "categoryAttributes/update"
    return this.httpClient.post<ResponseModel>(newPath, categoryAttribute)
  }

  delete(categoryAttribute : CategoryAttribute):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "categoryAttributes/delete"
    return this.httpClient.post<ResponseModel>(newPath, categoryAttribute)
  }
}
