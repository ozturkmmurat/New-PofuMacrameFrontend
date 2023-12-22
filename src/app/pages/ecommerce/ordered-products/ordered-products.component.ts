import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GlobalComponent } from 'src/app/global-component';
import { SelectUserOrderDto } from 'src/app/models/dtos/order/select/selectOrderDto';
import { SelectOrderedProductDto } from 'src/app/models/dtos/subOrder/select/selectOrderedProduct';
import { ErrorService } from 'src/app/services/Helper/errorService/error.service';
import { OrderService } from 'src/app/services/HttpClient/orderService/order.service';
import { SubOrderService } from 'src/app/services/HttpClient/subOrderService/sub-order.service';

const IMAGE_URL = GlobalComponent.IMAGE_URL;

@Component({
  selector: 'app-ordered-products',
  templateUrl: './ordered-products.component.html',
  styleUrls: ['./ordered-products.component.scss']
})
export class OrderedProductsComponent {

  imageUrl = IMAGE_URL
  orderedProducts : SelectOrderedProductDto[] = []

  /**
   *
   */
  constructor(
    private subOrderService : SubOrderService,
    private errorService : ErrorService,
    private toastrService : ToastrService
  ) {
  }

  ngOnInit(){
    this.getOrderDetail()
  }

  getOrderDetail(){
    this.subOrderService.getAllOrderedProduct().subscribe(response => {
      this.orderedProducts = response.data
      console.log("Order detail response data", response.data)
    })
  }

}
