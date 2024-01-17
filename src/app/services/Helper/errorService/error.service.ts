import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private toastrService : ToastrService
  ) { }

  checkError(err: HttpErrorResponse) {
    console.log("Error kontorl", err)
    if (err.error.Errors != undefined) {
      if (err.error.Errors.length > 0) {
        for (let i = 0; i < err.error.Errors.length; i++) {
          this.toastrService.error(err.error.Errors[i].ErrorMessage, "Doğrulama hatası")
        }
      } else if (err.error.Errors != undefined && err.error.Errors.length <= 0) {
        this.toastrService.error(err.error.message, "Hata")
      }
    }
    else if (err.error.Errors == undefined) {
      if(err.error.message){
        this.toastrService.error(err.error.message, "Hata")
      }
      if (err.error != undefined && typeof err.error !== 'object') {
        this.toastrService.error(err.error)
      }
    }
  }

}