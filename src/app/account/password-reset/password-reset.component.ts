import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, catchError, firstValueFrom } from 'rxjs';
import { ErrorService } from 'src/app/services/Helper/errorService/error.service';
import { PasswordResetService } from 'src/app/services/HttpClient/passwordResetService/password-reset.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent {

  _passwordResetForm: FormGroup;
  url: ""

  constructor(
    private passwordResetService: PasswordResetService,
    private errorService: ErrorService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.url = params['url'];
      if (this.url) {
        this.getUrl(this.url)
          .then(success => {
            if (success) {
              this.passwordResetForm();
            } else {
              this.router.navigate(['']);
            }
          })
          .catch(() => this.router.navigate(['']));
      } else {
        this.router.navigate(['']);
      }
    });
  }

  async getUrl(url: string): Promise<boolean> {
    try {
      const response = await firstValueFrom(this.passwordResetService.getByUrl(url));
      return response.success;
    } catch (error) {
      console.error('Error occurred while fetching code URL: ', error);
      throw error;
    }
  }

  passwordResetForm() {
    this._passwordResetForm = this.formBuilder.group({
      link: [this.url, Validators.required],
      newPassword: ["", Validators.required],
      againNewPassword: ["", Validators.required]
    })
  }

  passwordReset() {
    console.log("Kontrol", this._passwordResetForm)
    if (this._passwordResetForm.valid) {
      let passwordResetModel = Object.assign({}, this._passwordResetForm.value);
      this.passwordResetService.passwordReset(passwordResetModel).pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorService.checkError(err);
          return EMPTY;
        }))
        .subscribe((response) => {
          this.toastrService.success(response.message, "Başarılı")
        })
    } else {
      this.toastrService.error("Lütfen kodu giriniz.")
    }
  }



}
