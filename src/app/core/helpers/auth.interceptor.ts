import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { BehaviorSubject, Observable, of, pipe, throwError, EMPTY } from 'rxjs';
import { catchError, filter, ignoreElements, switchMap, take } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/HttpClient/authService/auth.service';
import { LocalStorageService } from 'src/app/services/Helper/localStorageService/local-storage.service';
import { UserService } from 'src/app/services/HttpClient/userService/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private userService : UserService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let newRequest : HttpRequest<any>;
    let token = this.localStorageService.getToken();
    if(token){
      newRequest = this.addTokenHeader(request, token);
      return next.handle(newRequest).pipe(
        catchError((error) => {
          if (error.status === 403) {
            return this.refreshToken(newRequest, next)
          }
          if (error.status === 401) {
            this.toastrService.error(error.error.Message)
          }
  
          const err = error.error.message || error.statusText;
          if (err === "Unknown Error") {
            this.userService._user.set(null)
            this.authService.logOut();
          }
          return throwError(error);
        })
      );
    }
    else{
       return next.handle(request);
    }
   
    return EMPTY;
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      headers: request.headers.set("Authorization", "Bearer " + token),
    });
  }

  private refreshToken(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      var refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        return this.authService.refreshTokenLogin(refreshToken).pipe(
          switchMap((token: any) => {
            this.isRefreshing = false;
            this.localStorageService.update("token", token.data.token)
            this.localStorageService.update("refreshToken", token.data.refreshToken)
            this.localStorageService.update("expiration", token.data.expiration);
            return next.handle(this.addTokenHeader(request, this.localStorageService.getToken()));
          }),
          catchError((err) => {
            if (err.status === 410) {
              this.isRefreshing = false;
              this.userService._user.set(null)
              this.localStorageService.signOut();
              this.router.navigate(["auth/login"]);
              return throwError(err);
            }
            return throwError(err);
          })
        );
      }
      return this.refreshTokenSubject.pipe(
        filter((token) => token !== null),
        take(1),
        switchMap((token) => next.handle(this.addTokenHeader(request, token)))
      );
    }
    return EMPTY
  }
}