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
import { AuthService } from 'src/app/services/HttpClient/authService/auth.service';
import { LocalStorageService } from 'src/app/services/Helper/localStorageService/local-storage.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
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
          console.log("İnterceptor error")
          if (error.status === 403) {
            console.log("Refresh token işlemi başladı")
            return this.refreshToken(newRequest, next)
          }
          if (error.status === 401) {
            console.log("401 gerçekleşti.")
            this.toastrService.error(error.error.Message)
          }
  
          const err = error.error.message || error.statusText;
          if (err === "Unknown Error") {
            this.authService.logOut();
          }
          return throwError(error);
        })
      );
    }
    else{
      console.log("Else düştü")
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
    console.log("Refresh tokena girdi.")
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      var refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        return this.authService.refreshTokenLogin(refreshToken).pipe(
          switchMap((token: any) => {
            console.log("Token yenilendi")
            console.log("Refresh token dan gelen token", token)
            this.isRefreshing = false;
            this.localStorageService.update("token", token.data.token)
            this.localStorageService.update("refreshToken", token.data.refreshToken)
            this.localStorageService.update("expiration", token.data.expiration);
            return next.handle(this.addTokenHeader(request, this.localStorageService.getToken()));
          }),
          catchError((err) => {
            if (err.status === 410) {
              this.isRefreshing = false;
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
