import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserPasswordResetDto } from 'src/app/models/dtos/user/userPasswordResetDto';
import { PasswordResetParameter } from 'src/app/models/entityParameter/passwordReset/passwordResetParameter';
import { ResponseModel } from 'src/app/models/responseModel/responseModel';
import { SingleResponseModel } from 'src/app/models/responseModel/singleResponseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {

  constructor(private httpClient: HttpClient) { }

  getByUrl(url : string):Observable<SingleResponseModel<any>>{
    let newPath = environment.apiUrl + "passwordResets/getByUrl?url=" + url
    return this.httpClient.get<SingleResponseModel<any>>(newPath);
  }

  getByCodeUrl(codeUrl : string):Observable<SingleResponseModel<any>>{
    let newPath = environment.apiUrl + "passwordResets/getByCodeUrl?codeUrl=" + codeUrl 
    return this.httpClient.get<SingleResponseModel<any>>(newPath);
  }
  
  sendPasswordResetCode(passwordResetParameter: PasswordResetParameter): Observable<SingleResponseModel<string>> {
    let newPath = environment.apiUrl + "passwordResets/sendPasswordResetCode"
    return this.httpClient.post<SingleResponseModel<string>>(newPath, passwordResetParameter)
  }

  sendPasswordResetLink(passwordResetParameter: PasswordResetParameter): Observable<ResponseModel>{
    let newPath = environment.apiUrl + "passwordResets/sendPasswordResetLink"
    return this.httpClient.post<ResponseModel>(newPath, passwordResetParameter)
  }

  passwordReset(userPasswordResetDto : UserPasswordResetDto){
    let newPath = environment.apiUrl + "passwordResets/passwordReset"
    return this.httpClient.post<ResponseModel>(newPath, userPasswordResetDto)
  }
}
