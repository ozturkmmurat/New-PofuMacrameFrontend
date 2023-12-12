import { Component, effect } from '@angular/core';
import { TokenStorageService } from '../../../core/services/token-storage.service';
import { UserService } from 'src/app/services/HttpClient/userService/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/services/Helper/errorService/error.service';
import { User } from 'src/app/core/models/auth.models';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss']
})
export class UserInformationComponent {
  userData:any;

  //Form Start
  _userForm : FormGroup;
  user : User

  constructor(
    private TokenStorageService : TokenStorageService,
    private userService : UserService,
    private formBuilder : FormBuilder,
    private toastrService : ToastrService,
    private errorService : ErrorService
    ) {
      this.loadingUser()
     }

  ngOnInit(): void {
    this.userData =  this.TokenStorageService.getUser();    
    this.userForm()
  }

  userForm(){
    
    this._userForm = this.formBuilder.group({
      userId:[Number(this.user.id), Validators.required],
      firstName:[this.user.firstName, Validators.required],
      lastName:[this.user.lastName, Validators.required],
      email:[this.user.email, Validators.required],
      phoneNumber:[this.user.phoneNumber, Validators.required],
      oldPassword:[],
      newPassword:[],
      againNewPassword:[],
    })
  }

  updateUser(){
    if(this._userForm.valid){
      let userModel = Object.assign({}, this._userForm.value)
      this.userService.update(userModel).pipe(
        catchError((err : HttpErrorResponse) => {
          this.errorService.checkError(err)
          return of();
        }))
        .subscribe(response => {
          this.userService.setCurrentUser();
          this.toastrService.success(response.message, "Başarılı")
        })
    }
  }

  loadingUser(){
    effect(() => {
      this.user = this.userService._user();
    });
  }

}
