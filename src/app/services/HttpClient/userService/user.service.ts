import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from 'environments/environment';
import { BehaviorSubject, EMPTY, Observable, catchError } from 'rxjs';
import { UserForUpdateDto } from 'src/app/models/dtos/user/userForUpdateDto';
import { ListResponseModel } from 'src/app/models/responseModel/listResponseModel';
import { ResponseModel } from 'src/app/models/responseModel/responseModel';
import { SingleResponseModel } from 'src/app/models/responseModel/singleResponseModel';
import { User } from 'src/app/models/user/user';
import { LocalStorageService } from '../../Helper/localStorageService/local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserDto } from 'src/app/models/dtos/user/userDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  jwtHelper: JwtHelperService = new JwtHelperService();
  constructor(private httpclient: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  user: User = null

  _user = signal(this.user)
  jwtUrl = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/"



  getByGuid(guid: string): Observable<SingleResponseModel<UserForUpdateDto>> {
    let newPath = environment.apiUrl + "users/getByGuid?guid=" + encodeURIComponent(guid);
    return this.httpclient.get<SingleResponseModel<UserForUpdateDto>>(newPath)
  }


  update(userForUpdateDto: UserForUpdateDto): Observable<ResponseModel> {
    return this.httpclient.post<ResponseModel>(environment.apiUrl + "users/update", userForUpdateDto)
  }

   setCurrentUser(): void {
    var token = this.localStorageService.getToken()
    if(token != null){
      this.getByGuid(this.getUserGuid()).pipe(
        catchError((err:HttpErrorResponse) => {
          return EMPTY
        }))
        .subscribe(response => {
           this.user = {
            id: response.data.id,
            email: response.data.email,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            phoneNumber : response.data.phoneNumber
          }
          this._user.set(this.user)
        })
    } 
  }

  /** JWT'den kullanıcı guid'ini okur (güvenlik için id yerine guid kullanılıyor). */
  getUserGuid(): string | null {
    const token = this.localStorageService.getToken();
    if (!token) return null;
    const decoded = this.jwtHelper.decodeToken(token);
    return decoded?.['guid'] ?? null;
  }

  /** JWT'den claim okur. Not: Kullanıcı kimliği için getUserGuid() kullanın, id okumayın. */
  getUserId(data: string) {
    if (this.localStorageService.getToken() != null)
      return this.jwtHelper.decodeToken(this.localStorageService.getToken())[this.jwtUrl + data];
  }

}