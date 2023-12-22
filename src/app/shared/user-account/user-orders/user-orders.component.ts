import { Component, effect } from '@angular/core';
import { GlobalComponent } from 'src/app/global-component';
import { SelectUserOrderDto } from 'src/app/models/dtos/order/select/selectOrderDto';
import { SelectSubOrderDto } from 'src/app/models/dtos/subOrder/select/selectSubOrderDto';
import { User } from 'src/app/models/user/user';
import { OrderService } from 'src/app/services/HttpClient/orderService/order.service';
import { UserService } from 'src/app/services/HttpClient/userService/user.service';

const IMAGE_URL = GlobalComponent.IMAGE_URL;


@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent {

  orders : SelectUserOrderDto[] = []
  imageUrl = IMAGE_URL

  constructor(private orderService : OrderService,
    private userService : UserService) {
  }

  ngOnInit(){
    this.getAllOrder()
  }

  getAllOrder(){
    this.orderService.getAllUserOrderDto().subscribe(response => {
      this.orders = response.data
    })
  }
}
