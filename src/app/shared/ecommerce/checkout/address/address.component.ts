import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, catchError } from 'rxjs';
import { City } from 'src/app/models/city/city';
import { UserAddress } from 'src/app/models/userAddress/userAddress';
import { CheckoutService } from 'src/app/services/Component/checkout/checkout.service';
import { ErrorService } from 'src/app/services/Helper/errorService/error.service';
import { CityService } from 'src/app/services/HttpClient/cityService/city.service';
import { UserAddressService } from 'src/app/services/HttpClient/userAddressService/user-address.service';
import { UserService } from 'src/app/services/HttpClient/userService/user.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent {

  submitted: any
  userAddresses: UserAddress[] = []
  cities:City[] = []

  //Form Start
  _userAddressForm: FormGroup;

  constructor(
    private userAddressService: UserAddressService,
    private userService : UserService,
    private cityService : CityService,
    private formBuilder: FormBuilder,
    private errorService : ErrorService,
    private modalService: NgbModal,
    private toastrService: ToastrService,
    private checkOutService : CheckoutService) { }


  ngOnInit() {
    this.getAllUserAddress()
    this.getAllCity()
    this.userAddressForm()
  }


  // Form Start
  userAddressForm(){
    this._userAddressForm = this.formBuilder.group({
      id:[0, Validators.required],
      userId:[Number(this.userService.getUserId("nameidentifier")),Validators.required],
      cityId:[0,Validators.required],
      addressTitle:['', Validators.required],
      address:['', Validators.required],
      postCode:['', Validators.required]
    })
  }

  resetAddressForm(){
    this._userAddressForm.patchValue({
      id:0,
      userId:Number(this.userService.getUserId("nameidentifier")),
      cityId:0,
      addressTitle:'',
      address:'',
      postCode:''
    })
  }

  writeForm(address: UserAddress){
    this._userAddressForm.patchValue({
      id:address.id, userId:Number(this.userService.getUserId("nameidentifier")), cityId:address.cityId, addressTitle:address.addressTitle, address:address.address,
      postCode:address.postCode
    })
  }


  /**
   * Confirmation mail model
   */
  confirm(content: any) {
    this.modalService.open(content, { centered: true });
  }

  /**
  * Open modal
  * @param content modal content
  */
  openModal(content: any) {
    this.submitted = false;
    this.modalService.open(content, { size: 'md', centered: true });
  }

  setAddressId(addressId:number){
    console.log("Adres id bilgisi",  addressId)
    this.checkOutService.setAddressId(addressId)
  }

  getAllUserAddress() {
    this.userAddressService.getUserAddresses().subscribe(response => {
      this.userAddresses = response.data
      this.setAddressId(response.data[0].id)
    })
  }

  getAllCity(){
    this.cityService.getAll().subscribe(response => {
      this.cities = response.data
    })
  }


  add(){
    if(this._userAddressForm.valid){
      let addressModel = Object.assign({}, this._userAddressForm.value);
      this.userAddressService.add(addressModel).pipe(
        catchError((err:HttpErrorResponse) => {
          this.errorService.checkError(err);
          return EMPTY;
        })
      )
      .subscribe((response) => {
        this.toastrService.success(response.message, 'Başarılı')
        this.getAllUserAddress()
      })
    }else{
      this.toastrService.error('Formu eksiksiz doldurun.')
    }
  }

  update(){
    if(this._userAddressForm.valid){
      let addressModel = Object.assign({}, this._userAddressForm.value);
      this.userAddressService.update(addressModel).pipe(
        catchError((err:HttpErrorResponse) => {
          this.errorService.checkError(err);
          return EMPTY;
        })
      )
      .subscribe((response) => {
        this.toastrService.success(response.message, 'Başarılı')
        this.getAllUserAddress()
      })
    }else{
      this.toastrService.error('Formu eksiksiz doldurun.')
    }
  }

  delete(userAdddress : UserAddress){
    this.userAddressService.delete(userAdddress).pipe(
      catchError((err : HttpErrorResponse) => {
        this.errorService.checkError(err)
        return EMPTY;
      }))
      .subscribe(response => {
        this.toastrService.success(response.message , "Başarılı");
        this.getAllUserAddress();
      })
  }
}
