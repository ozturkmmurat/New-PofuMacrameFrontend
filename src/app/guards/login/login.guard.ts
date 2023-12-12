import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/services/Helper/localStorageService/local-storage.service';
import { AuthService } from 'src/app/services/HttpClient/authService/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    private localStorageService:LocalStorageService,private toastrService:ToastrService, private router:Router, private authService:AuthService
  ){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const requiredRoles = route.data['roles'] as string[];
      if (this.localStorageService.isAuthenticated()) {
        return requiredRoles.includes(this.authService.decodeToken(this.localStorageService.getToken())['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
      }else{
      this.router.navigate(["login"])
      this.toastrService.info("Sisteme giriş yapmalısınız.")
      return true;
      }
    }
  }