import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Login Auth
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../core/services/authfake.service';
import { catchError, first } from 'rxjs/operators';
import { ToastService } from './toast-service';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { UserService } from 'src/app/services/HttpClient/userService/user.service';
import { LocalStorageService } from 'src/app/services/Helper/localStorageService/local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/Helper/errorService/error.service';
import { AuthService } from 'src/app/services/HttpClient/authService/auth.service';
import { UserForUpdateDto } from 'src/app/models/dtos/user/userForUpdateDto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login Component
 */
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  user: UserForUpdateDto;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    //Service Start
    private authService: AuthService, 
    private errorService : ErrorService,
    private toastrService: ToastrService, 
    private localStorageService: LocalStorageService,
    private userService:UserService
    //Service End
  ) {}

  ngOnInit() {
    this.createLoginForm()
  }
  ngOnDestroy() {
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: []
    })
  }


  login(){
    if(this.loginForm.valid){
      let loginModel = Object.assign({}, this.loginForm.value)
      this.authService.login(loginModel).pipe(
        catchError((err:HttpErrorResponse) => {
          this.errorService.checkError(err)
        return of();
        })) 
        .subscribe(response => {
          console.log("Login den gelen veri", response.data)
          this.localStorageService.setToken(response.data.token)
            this.localStorageService.setTokenExpiration(response.data.expiration)
            this.localStorageService.setRefreshToken(response.data.refreshToken)
            this.userService.setCurrentUser()
            this.router.navigate([""]);
        })
    }
  }

}