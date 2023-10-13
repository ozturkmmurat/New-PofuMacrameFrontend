import { Component } from '@angular/core';
import { GlobalComponent } from 'src/app/global-component';
import { SelectProductDto } from 'src/app/models/dtos/product/select/selectProductDto';
import { ProductService } from 'src/app/services/HttpClient/productService/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {

  //Global Variable
  imageUrl = GlobalComponent.IMAGE_URL;
  //Model Start
  selectProductDto : SelectProductDto[] = []

  //Ctor Start
  constructor(
    private productService : ProductService
  ) {
  }

  ngOnInit(){
    this.getAll()
  }

  getAll(){
    this.productService.getAllDto().subscribe(response => {
      this.selectProductDto = response.data
      console.log("Veriler",this.selectProductDto)
    })
  }

}