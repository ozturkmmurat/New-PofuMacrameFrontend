import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable, catchError } from 'rxjs';
import { SelectProductStockDto } from 'src/app/models/dtos/productStock/select/SelectProductStockDto';
import { ProductStock } from 'src/app/models/productStock/prodcutStock';
import { ErrorService } from 'src/app/services/Helper/errorService/error.service';
import { ProductStockService } from 'src/app/services/HttpClient/productStockService/product-stock.service';

@Component({
  selector: 'app-update-product-stock',
  templateUrl: './update-product-stock.component.html',
  styleUrls: ['./update-product-stock.component.scss']
})
export class UpdateProductStockComponent {
  _productStockForm : FormGroup;
  productStocks$ : Observable<SelectProductStockDto[]>;
  @Input() productStock: ProductStock;

  constructor(private productStockService : ProductStockService,
    private formBuilder : FormBuilder,
    private toastrService : ToastrService,
    private errorService : ErrorService) {
  }

  ngOnInit(){
    this.productStockForm()
    this.updateKdvAmount()
  }

  productStockForm(){
    console.log("Stok kontrol", this.productStock)
    this._productStockForm = this.formBuilder.group({
      id: [this.productStock.id, Validators.required],
      productId:[this.productStock.productId, Validators.required],
      productVariantId:[this.productStock.productVariantId, Validators.required],
      quantity:[this.productStock.quantity, Validators.required],
      price:[this.productStock.price, Validators.required],
      kdv:[this.productStock.kdv, Validators.required],
      kdvAmount:[0, Validators.required],
      netPrice:[this.productStock.netPrice, Validators.required],
      stockCode:[this.productStock.stockCode, Validators.required]
    })
  }

  update(){
    if(this._productStockForm.valid){
      let productStockModel = Object.assign({}, this._productStockForm.value)
      this.productStockService.update(productStockModel).pipe(
        catchError((err : HttpErrorResponse) => {
          this.errorService.checkError(err)
          return EMPTY;
        }))
        .subscribe(response => {
          this.refreshProductStock(this.productStock.productId)
          this.toastrService.success(response.message, "Başarılı")
        })
    }
  }

  refreshProductStock(productId : number){  
    this.productStockService.getByAllDto(productId).subscribe((response => {
      this.productStockService.productStocks$.next(response.data)
    }))
  }

  updateKdvAmount() {
    const selectedKdv = +this._productStockForm.get('kdv')?.value;
    const price = +this._productStockForm.get('price')?.value;
    const kdvAmount = (price * selectedKdv) / 100;
    this._productStockForm.get('kdvAmount').setValue(kdvAmount);
    this._productStockForm.get('netPrice').setValue(price + kdvAmount)
}
}
