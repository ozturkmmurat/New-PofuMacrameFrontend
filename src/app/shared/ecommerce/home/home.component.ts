import { Component } from '@angular/core';
import { environment } from 'environments/environment.prod';
import { GlobalComponent } from 'src/app/global-component';
import { SelectListProductVariantDto } from 'src/app/models/dtos/product/select/selectListProductVariantDto';
import { ProductService } from 'src/app/services/HttpClient/productService/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
 //Model Start
 secondaryPhotoUrl : string;
 productVariants : SelectListProductVariantDto [] = []
 //Model End

 //Variable Start
 imageFolderUrl :string
 //Variable End

 constructor(
   private productService : ProductService
 ) {
   this.imageFolderUrl = GlobalComponent.API_URL
 }

 ngOnInit() {
   this.getAllProductVariantDto()
   //My Function Start
   //My Function End
 }


 getAllProductVariantDto(){
   this.productService.getAllProductVariantDtoPv().subscribe(response => {
     this.productVariants = response.data
     console.log(response.data)
   })
 }
}
