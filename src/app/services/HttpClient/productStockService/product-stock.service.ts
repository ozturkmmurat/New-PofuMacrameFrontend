import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SelectProductStockDto } from 'src/app/models/dtos/productStock/select/SelectProductStockDto';
import { Product } from 'src/app/models/product/product';
import { ProductStock } from 'src/app/models/productStock/prodcutStock';
import { ListResponseModel } from 'src/app/models/responseModel/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel/responseModel';
import { SingleResponseModel } from 'src/app/models/responseModel/singleResponseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductStockService {

  productStocks : SelectProductStockDto[] = []

  constructor(
    private httpClient : HttpClient
  ) { }

  productStocks$ = new BehaviorSubject<SelectProductStockDto[]>(this.productStocks);  // Veriyi bundan al 

  get productStock$(): Observable<SelectProductStockDto[]> {
    return this.productStocks$.asObservable();
  }

  get productStock(): SelectProductStockDto[] {
    return this.productStocks$.value;
  }

  getByAllDto(productId : number):Observable<ListResponseModel<SelectProductStockDto>>{
    let newPath = environment.apiUrl + "productStocks/GetAllProductStockDto?productId=" + productId
    return this.httpClient.get<ListResponseModel<SelectProductStockDto>>(newPath);
  }

  getByProductVariantId(productVariantId : number):Observable<SingleResponseModel<ProductStock>>{
    let newPath = environment.apiUrl + "productStocks/getByProductVariantId?productVariantId=" + productVariantId
    return this.httpClient.get<SingleResponseModel<ProductStock>>(newPath)
  }

  update(productStock : ProductStock):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "productStocks/update"
    return this.httpClient.post<ResponseModel>(newPath, productStock)
  }
}
