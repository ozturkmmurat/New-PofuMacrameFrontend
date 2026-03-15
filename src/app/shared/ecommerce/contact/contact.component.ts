import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, catchError } from 'rxjs';
import { MailDto } from 'src/app/models/dtos/mail/MailDto';
import { ErrorService } from 'src/app/services/Helper/errorService/error.service';
import { MailService } from 'src/app/services/HttpClient/mailService/mail.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private mailService: MailService,
    private errorService: ErrorService,
    private toastrService: ToastrService
  ) {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(100)]],
      lastName: ['', [Validators.required, Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.maxLength(20)]],
      description: ['', [Validators.required, Validators.maxLength(2000)]]
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.contactForm.invalid) {
      return;
    }

    const value = this.contactForm.value;
    const mailDto: MailDto = {
      firstNameLastName: `${value.firstName} ${value.lastName}`.trim(),
      email: value.email,
      phoneNumber: value.phone,
      mailBody: value.description,
      mailTitle: 'İletişim Formu'
    };

    this.loading = true;
    this.mailService
      .contact(mailDto)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorService.checkError(err);
          this.loading = false;
          return EMPTY;
        })
      )
      .subscribe(response => {
        this.loading = false;
        if (response.success) {
          this.toastrService.success(response.message ?? 'Mesajınız gönderildi.', 'Başarılı');
          this.submitted = false;
          this.contactForm.reset();
        } else {
          this.toastrService.error(response.message ?? 'Bir hata oluştu.', 'Hata');
        }
      });
  }
}
