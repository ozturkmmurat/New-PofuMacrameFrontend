import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

// Register Auth
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../core/services/auth.service';
import { UserProfileService } from '../../core/services/user.service';
import { Router } from '@angular/router';
import { catchError, first } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { EMPTY } from 'rxjs';
import { ErrorService } from 'src/app/services/Helper/errorService/error.service';
import { AuthService } from 'src/app/services/HttpClient/authService/auth.service';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'src/app/services/Helper/localStorageService/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

/**
 * Register Component
 */
export class RegisterComponent implements OnInit {

  registerForm: FormGroup

  constructor(
    //Service Start
    private authService: AuthService,
    private toastrService: ToastrService,
    private errorService : ErrorService,
    //Service End

    private formBuilder: FormBuilder,
    private localStorageService : LocalStorageService
  ) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  register(){
    if(this.registerForm.valid){
      let registerModel = Object.assign({}, this.registerForm.value)
      this.authService.register(registerModel).pipe(
        catchError((err : HttpErrorResponse) => {
          this.errorService.checkError(err)
          return EMPTY
        }))
        .subscribe(response => {
          console.log("Response", response.data)
          this.localStorageService.setToken(response.data.token)
          this.localStorageService.setTokenExpiration(response.data.expiration)
          this.toastrService.success(response.message)
        })
    }else{
      this.toastrService.error("Formu eksiksiz doldurun.")
    }
  }

}