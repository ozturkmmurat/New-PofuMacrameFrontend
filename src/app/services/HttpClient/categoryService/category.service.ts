import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Category } from 'src/app/models/category/category';
import { CategoryDto } from 'src/app/models/dtos/category/CategoryDto';
import { SelectCategoryDto } from 'src/app/models/dtos/category/select/selectCategoryDto';
import { FilterCategory } from 'src/app/models/entityParameter/category/filterCategory';
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

  getAllCategoryHierarchy():Observable<ListResponseModel<SelectCategoryDto>>{
    let newPath = environment.apiUrl + "categories/getAllCategoryHierarchy"
    return this.httpClient.get<ListResponseModel<SelectCategoryDto>>(newPath);
  }

  getAllSubCategory(categoryId:number):Observable<ListResponseModel<Category>>{
    let newPath = environment.apiUrl + "categories/getAllSubCategory?categoryId="+ categoryId
    return this.httpClient.get<ListResponseModel<Category>>(newPath);
  }

  getAllRandomCategory(filter: FilterCategory): Observable<ListResponseModel<CategoryDto>> {
    const newPath = environment.apiUrl + 'categories/getAllRandomCategory';
    return this.httpClient.post<ListResponseModel<CategoryDto>>(newPath, filter);
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
}
