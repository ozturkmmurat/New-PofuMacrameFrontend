import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductAttribute } from 'src/app/models/productAttribute/productAttribute';
import { ProductAttributeDto } from 'src/app/models/dtos/productAttribute/productAttributeDto';
import { ProductAttributeFilterDto } from 'src/app/models/dtos/productAttribute/productAttributeFilterDto';
import { ListResponseModel } from 'src/app/models/responseModel/listResponseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductAttributeService {

  constructor(private httpClient: HttpClient) { }

  getAllProductAttribute(dto: ProductAttributeDto): Observable<ListResponseModel<ProductAttributeDto>> {
    const path = environment.apiUrl + 'productAttributes/GetAllProductAttribute';
    return this.httpClient.post<ListResponseModel<ProductAttributeDto>>(path, dto);
  }

  getFilterByProductIds(productIds: number[]): Observable<ListResponseModel<ProductAttributeFilterDto>> {
    const path = environment.apiUrl + 'productAttributes/GetFilterAttributesByProductIds';
    return this.httpClient.post<ListResponseModel<ProductAttributeFilterDto>>(path, productIds);
  }

  getAllByProductId(productId: number): Observable<ListResponseModel<ProductAttribute>> {
    const path = environment.apiUrl + 'productAttributes/GetAllByProductId?productId=' + productId;
    return this.httpClient.get<ListResponseModel<ProductAttribute>>(path);
  }
}
