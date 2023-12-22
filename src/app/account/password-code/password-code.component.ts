import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, catchError } from 'rxjs';
import { ErrorService } from 'src/app/services/Helper/errorService/error.service';
import { PasswordResetService } from 'src/app/services/HttpClient/passwordResetService/password-reset.service';

@Component({
  selector: 'app-password-code',
  templateUrl: './password-code.component.html',
  styleUrls: ['./password-code.component.scss']
})
export class PasswordCodeComponent {

  config = {
    allowNumbersOnly: false,
    length: 8,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '40px',
      'height': '50px'
    }
  };

  _passwordCodeForm : FormGroup;
  codeUrl = "";
  status : boolean
  codeControl = new FormControl('', Validators.required)

  constructor(
    private passwordResetService : PasswordResetService,
    private errorService : ErrorService,
    private toastrService : ToastrService,
    private formBuilder : FormBuilder,
    private route : ActivatedRoute,
    private router : Router
  ) {
  }

  ngOnInit(){
  
    this.route.params.subscribe((params) => {
      if (this.getCodeUrl(params["codeUrl"]) == true) {
        if(params["codeUrl"]){
          this.codeUrl = params["codeUrl"]
            this.passwordCodeForm();
        }
      }else{
        this.router.navigate([""])
      }
    })
  }

  getCodeUrl(codeUrl : string) : boolean{
    var status
    this.passwordResetService.getByCodeUrl(codeUrl).subscribe(response => {
      status = response.success
    })
    return status
  }

  passwordCodeForm(){
    console.log("Form oluşturuldu", this.codeUrl)
    this._passwordCodeForm = this.formBuilder.group({
      code:this.codeControl,
      codeUrl:[this.codeUrl, Validators.required]
    })
  }

  passwordCode(){
    console.log("Kontrol code bölümü", this._passwordCodeForm)
    if(this._passwordCodeForm.valid){
      let passwordCodeModel = Object.assign({}, this._passwordCodeForm.value);
      this.passwordResetService.sendPasswordResetLink(passwordCodeModel).pipe(
        catchError((err : HttpErrorResponse) => {
          this.errorService.checkError(err);
          return EMPTY;
        }))
        .subscribe((response) => {
          this.toastrService.success(response.message, "Başarılı")
        })
    }else{
      this.toastrService.error("Lütfen kodu giriniz.")
    }
  }

}
