import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, catchError } from 'rxjs';
import { ErrorService } from 'src/app/services/Helper/errorService/error.service';
import { PasswordResetService } from 'src/app/services/HttpClient/passwordResetService/password-reset.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  _forgotPasswordForm  : FormGroup;


  constructor(
    private passwordResetService : PasswordResetService,
    private errorService : ErrorService,
    private toastrService : ToastrService,
    private formBuilder : FormBuilder,
    private router : Router,
  ) {
  }

  ngOnInit(){
    this.forgotPasswordForm();
  }

  forgotPasswordForm(){
    this._forgotPasswordForm = this.formBuilder.group({
      email:["", Validators.required]
    })
  }

  forgotPassword(){
    console.log("Kontrol", this._forgotPasswordForm)
    if(this._forgotPasswordForm.valid){
      let forgotPasswordModel = Object.assign({}, this._forgotPasswordForm.value);
      this.passwordResetService.sendPasswordResetCode(forgotPasswordModel).pipe(
        catchError((err : HttpErrorResponse) => {
          this.errorService.checkError(err);
          return EMPTY;
        }))
        .subscribe((response) => {
          this.toastrService.success(response.message, "Başarılı")
          this.router.navigate(["auth/password-code/basic/" + response.data])
        })
    }else{
      this.toastrService.error("Lütfen email adresinizi giriniz.")
    }
  }

}
