import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductPriceFactor } from 'src/app/models/productPriceFactor/product-price-factor';
import { ListResponseModel } from 'src/app/models/responseModel/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel/responseModel';
import { SingleResponseModel } from 'src/app/models/responseModel/singleResponseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductPriceFactorService {

  private readonly baseUrl = environment.apiUrl + 'productpricefactors/';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<ListResponseModel<ProductPriceFactor>> {
    return this.httpClient.get<ListResponseModel<ProductPriceFactor>>(this.baseUrl + 'getAll');
  }

  getAllAsNoTracking(): Observable<ListResponseModel<ProductPriceFactor>> {
    return this.httpClient.get<ListResponseModel<ProductPriceFactor>>(this.baseUrl + 'getAllAsNoTracking');
  }

  getById(id: number): Observable<SingleResponseModel<ProductPriceFactor>> {
    return this.httpClient.get<SingleResponseModel<ProductPriceFactor>>(this.baseUrl + 'getById?id=' + id);
  }

  add(productPriceFactor: ProductPriceFactor): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.baseUrl + 'add', productPriceFactor);
  }

  update(productPriceFactor: ProductPriceFactor): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.baseUrl + 'update', productPriceFactor);
  }

  delete(productPriceFactor: ProductPriceFactor): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.baseUrl + 'delete', productPriceFactor);
  }
}
