import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SelectListProductVariantDto } from 'src/app/models/dtos/product/select/selectListProductVariantDto';
import { SelectProductDto } from 'src/app/models/dtos/product/select/selectProductDto';
import { AddProductVariant } from 'src/app/models/dtos/productVariant/addProductVariant';
import { FilterProduct } from 'src/app/models/entityParameter/product/filterProduct';
import { Product } from 'src/app/models/product/product';
import { ListResponseModel } from 'src/app/models/responseModel/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel/responseModel';
import { SingleResponseModel } from 'src/app/models/responseModel/singleResponseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productModel : Product={
    id:0,
    categoryId:0,
    description:"",
    productName:"",
    productCode:""
  }


  constructor(private httpClient : HttpClient) { }


  products$ = new BehaviorSubject<Product>(this.productModel);  // Veriyi bundan al 

  get product$(): Observable<Product> {
    return this.products$.asObservable();
  }

  get product(): Product {
    return this.products$.value;
  }

  tsaAdd(addProductVariant : AddProductVariant):Observable<ResponseModel>{
    console.log("Service gelen veri", addProductVariant)
    let newPath = environment.apiUrl + "products/tsaAdd"
    return this.httpClient.post<ResponseModel>(newPath, addProductVariant)
  }

  update(product : Product):Observable<ResponseModel>{
    let newPath = environment.apiUrl + "products/update"
    return this.httpClient.post<ResponseModel>(newPath, product)
  }

  getBy(id : number):Observable<SingleResponseModel<Product>>{
    console.log("Service id", id)
    let newPath = environment.apiUrl + "products/getById?id=" + id
    return this.httpClient.get<SingleResponseModel<Product>>(newPath);
  }

  getByProductDto(productId : number):Observable<SingleResponseModel<SelectProductDto>>{
    let newPath = environment.apiUrl + "products/getByProductDto?productId=" + productId
    return this.httpClient.get<SingleResponseModel<SelectProductDto>>(newPath);
  }

  getAllDto():Observable<ListResponseModel<SelectProductDto>>{
    let newPath = environment.apiUrl + "products/getAllProductDto"
    return this.httpClient.get<ListResponseModel<SelectProductDto>>(newPath);
  }

    //Urune bagli ana varyant urunleri cekiyoruz
    getAllProductVariantDtoPv(filterProduct:FilterProduct):Observable<ListResponseModel<SelectListProductVariantDto>>{
      let newPath = environment.apiUrl + "products/getAllProductVariantDtoGroupVariant"
      return this.httpClient.post<ListResponseModel<SelectListProductVariantDto>>(newPath, filterProduct);
    }

 
}
