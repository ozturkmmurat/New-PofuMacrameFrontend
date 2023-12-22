import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/HttpClient/authService/auth.service';
import { LocalStorageService } from 'src/app/services/Helper/localStorageService/local-storage.service';
import { UserService } from 'src/app/services/HttpClient/userService/user.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/Helper/errorService/error.service';
import { UserForUpdateDto } from 'src/app/models/dtos/user/userForUpdateDto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private toastrService: ToastrService,
    private errorService: ErrorService
  ) { }

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value)
      this.authService.login(loginModel).pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorService.checkError(err);
          return of();
        })
      ).subscribe(response => {
        console.log("Login den gelen veri", response.data);
        this.localStorageService.setToken(response.data.token);
        this.localStorageService.setTokenExpiration(response.data.expiration);
        this.localStorageService.setRefreshToken(response.data.refreshToken);
        this.userService.setCurrentUser();
        this.router.navigate(['']);
      });
    } else {
      this.toastrService.warning('Lütfen gerekli alanları doldurun.');
      // veya başka işlemler yapabilirsiniz
    }
  }
}
