import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { en } from '@fullcalendar/core/internal-common';
import { BehaviorSubject, Observable } from 'rxjs';
import { AddProductVariant } from 'src/app/models/dtos/productVariant/addProductVariant';
import { ProductVariantGroupDetailDto } from 'src/app/models/dtos/productVariant/select/productVariantGroupDetailDto';
import { ProductVariant } from 'src/app/models/productVariant/productVariant';
import { ListResponseModel } from 'src/app/models/responseModel/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel/responseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductVariantService {

  constructor(
    private httpClient : HttpClient
  ) { }

  delete(productVariant : ProductVariant):Observable<ResponseModel>{
    console.log("Service gelen product variant delete", productVariant)
    let newPath = environment.apiUrl + "productVariants/delete"
    return this.httpClient.post<ResponseModel>(newPath, productVariant)
  }

  //Urun detay da ana default olarak varyantlari getirirken kullaniliyor
  getDefaultProductVariantDetail(productId:number, parentId:number):Observable<ListResponseModel<ProductVariantGroupDetailDto>>{
    let newPath = environment.apiUrl + "productVariants/GetDefaultProductVariantDetail?productId=" + productId + "&parentId="+parentId
    return this.httpClient.get<ListResponseModel<ProductVariantGroupDetailDto>>(newPath)
  }

  getSubProductVariantDetail(productVariantGroupDetailDto : ProductVariantGroupDetailDto[], productId : number, parentId: number):Observable<ListResponseModel<ProductVariantGroupDetailDto>>{
    let newPath = environment.apiUrl + "productVariants/getSubProductVariantDetail?productId=" + productId + "&parentId="+parentId
    return this.httpClient.post<ListResponseModel<ProductVariantGroupDetailDto>>(newPath, productVariantGroupDetailDto)
  }
}
