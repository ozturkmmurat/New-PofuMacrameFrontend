import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { City } from 'src/app/models/city/city';
import { ListResponseModel } from 'src/app/models/responseModel/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private httpClient : HttpClient) { }

  getAll():Observable<ListResponseModel<City>>{
    let newPath = environment.apiUrl + "cities/getAll"
    return this.httpClient.get<ListResponseModel<City>>(newPath);
  }
}
