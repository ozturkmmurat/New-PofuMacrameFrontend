import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryImage } from 'src/app/models/categoryImage/categoryImage';
import { ListResponseModel } from 'src/app/models/responseModel/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel/responseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryImageService {

  constructor(private httpClient: HttpClient) { }

  getAllByCategoryId(categoryId: number): Observable<ListResponseModel<CategoryImage>> {
    const newPath = environment.apiUrl + 'categoryImages/getAllByCategoryId?categoryId=' + categoryId;
    return this.httpClient.get<ListResponseModel<CategoryImage>>(newPath);
  }

  add(categoryImage: FormData): Observable<ResponseModel> {
    const newPath = environment.apiUrl + 'categoryImages/add';
    return this.httpClient.post<ResponseModel>(newPath, categoryImage);
  }

  update(categoryImage: FormData): Observable<ResponseModel> {
    const newPath = environment.apiUrl + 'categoryImages/update';
    return this.httpClient.post<ResponseModel>(newPath, categoryImage);
  }

  delete(categoryImage: CategoryImage): Observable<ResponseModel> {
    const newPath = environment.apiUrl + 'categoryImages/delete';
    return this.httpClient.post<ResponseModel>(newPath, categoryImage);
  }

  addList(addCategoryImageDtos: FormData): Observable<ResponseModel> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    const newPath = environment.apiUrl + 'categoryImages/addList';
    return this.httpClient.post<ResponseModel>(newPath, addCategoryImageDtos, { headers });
  }
}
