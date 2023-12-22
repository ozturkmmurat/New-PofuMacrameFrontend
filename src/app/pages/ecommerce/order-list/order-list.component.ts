import { Component } from '@angular/core';
import { Order } from 'src/app/models/order/order';
import { OrderService } from 'src/app/services/HttpClient/orderService/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent {

  orders : Order[] = []

  constructor(private orderService : OrderService) {
  }

  ngOnInit(){
    this.getAll()
  }

  getAll(){
    this.orderService.getAll().subscribe(response => {
      this.orders = response.data
    })
  }

}
