import { Component, effect } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/auth.models';
import { GlobalComponent } from 'src/app/global-component';
import { SelectUserOrderDto } from 'src/app/models/dtos/order/select/selectOrderDto';
import { OrderService } from 'src/app/services/HttpClient/orderService/order.service';
import { UserService } from 'src/app/services/HttpClient/userService/user.service';

const IMAGE_URL = GlobalComponent.IMAGE_URL;


@Component({
  selector: 'app-user-order-detail',
  templateUrl: './user-order-detail.component.html',
  styleUrls: ['./user-order-detail.component.scss']
})
export class UserOrderDetailComponent {

  imageUrl = IMAGE_URL
  orderDetail :  SelectUserOrderDto
  user:User
  
  constructor(
    private orderService : OrderService,
    private route : ActivatedRoute,
    private userService : UserService) {
      this.loadingUser()
  }

  ngOnInit(){
    this.route.params.subscribe((params) => {
      if(params['orderId']){
        this.getOrderDetail(params['orderId'])
      }
    })
  }

  getOrderDetail(orderId : number){
    this.orderService.getUserOrderDtoDetail(orderId).subscribe(response => {
      this.orderDetail = response.data
      console.log("Order detail response data", response.data)
    })
  }

  loadingUser(){
    effect(() => {
      this.user = this.userService._user();
      console.log("NavbarComponent'teki user", this.user);
    });
  }

}
