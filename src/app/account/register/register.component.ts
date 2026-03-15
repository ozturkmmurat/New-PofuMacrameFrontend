import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from 'src/app/services/Helper/errorService/error.service';
import { AuthService } from 'src/app/services/HttpClient/authService/auth.service';
import { UserService } from 'src/app/services/HttpClient/userService/user.service';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'src/app/services/Helper/localStorageService/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private errorService: ErrorService,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(11)]],
      password: ['', Validators.required]
    });
  }

  register() {
    if (this.registerForm.valid) {
      const registerModel = Object.assign({}, this.registerForm.value);
      this.authService.register(registerModel).pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorService.checkError(err);
          return EMPTY;
        })
      ).subscribe(response => {
        this.localStorageService.setToken(response.data.token);
        this.localStorageService.setTokenExpiration(response.data.expiration);
        if (response.data.refreshToken) {
          this.localStorageService.setRefreshToken(response.data.refreshToken);
        }
        this.userService.setCurrentUser();
        this.toastrService.success(response.message);
        this.router.navigate(['']);
      });
    } else {
      this.toastrService.error('Formu eksiksiz doldurun.');
    }
  }
}
