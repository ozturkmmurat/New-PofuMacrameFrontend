import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject} from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from '../../Helper/localStorageService/local-storage.service';
import { User } from 'src/app/models/user/user';
import { SingleResponseModel } from 'src/app/models/responseModel/singleResponseModel';
import { TokenModel } from 'src/app/models/token/tokenModel';
import { RegisterModel } from 'src/app/models/auth/registerModel';
import { UserForLoginDto } from 'src/app/models/auth/loginModel';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _currentTokenUser$ = new BehaviorSubject<User>(null);
  user: User
  jwtHelper: JwtHelperService = new JwtHelperService();
  userToken: any;
  decodedToken: any;


  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router
  ) { }

  logOut() {
    this.localStorageService.signOut();
    this.router.navigate(["/login"]);
  }

  refreshTokenLogin(tokenModel: string) {
    console.log("İstek yollandı", tokenModel)
    let newPath = environment.apiUrl + "auth/refreshTokenLogin?refreshToken=" + tokenModel
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, null)
  }

  login(loginModel: UserForLoginDto) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(environment.apiUrl + "auth/login", loginModel)
  }

  register(registerModel: RegisterModel) {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(environment.apiUrl + "auth/register", registerModel)
  }


  decodeToken(token: string) {
    if(token !=null){
      return this.jwtHelper.decodeToken(token);
    }
  }
}