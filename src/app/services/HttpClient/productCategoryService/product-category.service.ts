import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductCategory } from 'src/app/models/productCategory/product-category';
import { ListResponseModel } from 'src/app/models/responseModel/listResponseModel';
import { environment } from 'src/environments/environment';

/** Ana kategori + ek kategoriler state (form ve product$ senkronu için). */
export interface ProductCategoryState {
  mainCategoryId: number;
  categoryId: number[];
}

/** Html tarafındaki işlemler: kategori state yönetimi (setState, getState$, state, reset). */
@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  private readonly defaultState: ProductCategoryState = {
    mainCategoryId: 0,
    categoryId: []
  };

  private readonly state$ = new BehaviorSubject<ProductCategoryState>(this.defaultState);

  getState$(): Observable<ProductCategoryState> {
    return this.state$.asObservable();
  }

  get state(): ProductCategoryState {
    return this.state$.value;
  }

  setState(mainCategoryId: number, categoryId: number[]): void {
    this.state$.next({
      mainCategoryId,
      categoryId: Array.isArray(categoryId) ? categoryId : []
    });
  }

  reset(): void {
    this.state$.next(this.defaultState);
  }
}

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryHttpService {
  constructor(private httpClient: HttpClient) {}

  getByProductId(productId: number): Observable<ListResponseModel<ProductCategory>> {
    return this.httpClient.get<ListResponseModel<ProductCategory>>(
      environment.apiUrl + 'productCategories/GetByProductId?productId=' + productId
    );
  }
}