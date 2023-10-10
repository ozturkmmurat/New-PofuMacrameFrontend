import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product/product';
import { ProductImage } from 'src/app/models/productImage/productImage';
import { ListResponseModel } from 'src/app/models/responseModel/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel/responseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {

  constructor(private httpClient : HttpClient) { }


  getAllImageByProductVariantId(productVariantId : number):Observable<ListResponseModel<ProductImage>>{
    let newPath = environment.apiUrl + "productImages/getAllByProductVariantId?productVariantId="+productVariantId
    return this.httpClient.get<ListResponseModel<ProductImage>>(newPath)
  }

  add(productImage : FormData):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "productImages/add"
    return this.httpClient.post<ResponseModel>(newPath, productImage);
  }

  update(productImage : FormData):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "productImages/update"
    return this.httpClient.post<ResponseModel>(newPath, productImage);
  }

  delete(productImage : ProductImage):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "productImages/delete"
    return this.httpClient.post<ResponseModel>(newPath, productImage);
  }
  
  addList(addProductImageDtos : FormData):Observable<ResponseModel>{
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    console.log("Gelen veri", addProductImageDtos)
    let newPath = environment.apiUrl + "productImages/addList"
    return this.httpClient.post<ResponseModel>(newPath, addProductImageDtos, {headers});
  }
}
