import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// Products Services
import { restApiService } from "../../../core/services/rest-api.service";

import { productModel, productList } from 'src/app/pages/ecommerce/product.model';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
import { ActiveAttribute } from 'src/app/models/html/ActiveAttribute/activeAttribute';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ProductImage } from 'src/app/models/productImage/productImage';
import { ProductVariantGroupDetailDto } from 'src/app/models/dtos/productVariant/select/productVariantGroupDetailDto';
import { SelectProductDto } from 'src/app/models/dtos/product/select/selectProductDto';
import { GlobalComponent } from 'src/app/global-component';
import { ProductService } from 'src/app/services/HttpClient/productService/product.service';
import { ProductVariantService } from 'src/app/services/HttpClient/productVariantService/productVariant.service';
import { ProductImageService } from 'src/app/services/HttpClient/productImageService/product-image.service';
import { NavbarService } from 'src/app/services/Design/navbarService/navbar.service';

//Global Variable
const IMAGE_URL = GlobalComponent.IMAGE_URL;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})

/**
 * ProductDetail Component
 */

export class ProductDetailComponent implements OnInit {

    //Model Start
    product: SelectProductDto;
    productVariantAttributes: ProductVariantGroupDetailDto[]
    productImage: ProductImage[]
    endProductVariantId : number
    price:number
    //HTML
    ckeditorHtml: string; // CKEditor'dan gelen HTML içeriği
    safeHtml: SafeHtml;
    productVariantId: number;
    imageUrl = IMAGE_URL
    selectAttributeId: number
    selectAttributeListId: number
    previousIsActiveAttributes: boolean[] = [];
    activeAttributes: ActiveAttribute[] = [];
    activeAttribute: ActiveAttribute

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  public productDetail!: productModel[];
  isImage:any;
  defaultSelect = 2;
  readonly = false;
  content?: any;
  products: any;

  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    public restApiService: restApiService,
    private productService : ProductService,
    private productVariantService : ProductVariantService,
    private sanitizer: DomSanitizer,
    private productImageService : ProductImageService,
    private navbarService : NavbarService) {
  }

  ngOnInit(): void {
    /**
   * BreadCrumb
   */
    this.breadCrumbItems = [
      { label: 'Ecommerce' },
      { label: 'Product Details', active: true }
    ];

    //My Function End
    this.products = this.route.snapshot.params
    this.route.params.subscribe((params) => {
      if (params['productId'] && params['productVariantId']) {
        this.getProduct(params['productId']);
        this.getDefaultProductVariantDetail(params['productId'], params['productVariantId']);
        this.productVariantId = params['productVariantId']
        this.productDetail = productList.filter(function (product) {
          return product.id == parseInt(params['productId'])
        })
      }
    });
  }

  /**
   * Swiper setting
   */
  config = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false
  };

  slidesConfig = {
    // Configuration options for the ngx-slick-carousel
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
  }

  slickChange(event: any) {
    const swiper = document.querySelectorAll('.swiperlist')
  }

  slidePreview(id: any, event: any) {
    const swiper = document.querySelectorAll('.swiperlist');
    swiper.forEach((el: any) => {
      el.classList.remove('swiper-slide-thumb-active');
    });
    event.target
      .closest('.swiperlist')
      .classList.add('swiper-slide-thumb-active');
      this.slickModal.slickGoTo(id)
  }


  //Select size
  selectAttribute(ev: any, className: any, selectAttributeId: number, selectAttributeListId: number, productId: number, parentId: number) {
    const element = document.querySelectorAll('.' + className);
    if(element.length > 0){
      element.forEach((el: any) => {
        el.classList.remove('active');
      });
      if (ev.target.classList.contains(className)) {
        ev.target.closest('.' + className).classList.add('active');
      }
    }
    
    this.activeAttributes = []
    for (let i = 0; i < this.productVariantAttributes.length; i++) {
      if (i < selectAttributeId) {
        for (let j = 0; j < this.productVariantAttributes[i].productVariantAttributeValueDtos.length; j++) {
          if (this.productVariantAttributes[i].productVariantAttributeValueDtos[j].isActiveAttribute == true) {
            const activeAttribute: ActiveAttribute = {
              attributeIndex: i,
              attributeListIndex: j
            };
            this.activeAttributes.push(activeAttribute)
          }
        }
      }
    }
    this.getSubProductVariantDetail(productId, parentId).then(response => {
      for (let k = 0; k < this.activeAttributes.length; k++) {
        for (let i = 0; i < this.productVariantAttributes.length; i++) {
          if (this.activeAttributes[k].attributeIndex == i) {
            for (let j = 0; j < this.productVariantAttributes[i].productVariantAttributeValueDtos.length; j++) {
              if (this.activeAttributes[k].attributeListIndex == j) {
                this.productVariantAttributes[i].productVariantAttributeValueDtos[j].isActiveAttribute = true
              }
            }
          }
        }
      }
      var state = true;
      for (let i = 0; i < this.productVariantAttributes.length; i++) {
        if (i == selectAttributeId) {
          for (let j = 0; j < this.productVariantAttributes[i].productVariantAttributeValueDtos.length; j++) {
            if (j == selectAttributeListId) {
              this.productVariantAttributes[i].productVariantAttributeValueDtos[j].isActiveAttribute = true
            } else {
              this.productVariantAttributes[i].productVariantAttributeValueDtos[j].isActiveAttribute = false
            }
          }
        } else if (i > selectAttributeId) {
          for (let j = 0; j < this.productVariantAttributes[i].productVariantAttributeValueDtos.length; j++) {
            if (i != response.data.length -1 && j == 0) {
              this.productVariantAttributes[i].productVariantAttributeValueDtos[0].isActiveAttribute = true
            }
            else if(i == response.data.length -1 && this.productVariantAttributes[i].productVariantAttributeValueDtos[j].quantity > 0 && state == true){
              response.data[i].productVariantAttributeValueDtos[j].isActiveAttribute = true
              this.price = response.data[i].productVariantAttributeValueDtos[j].price
              this.endProductVariantId = response.data[i].productVariantAttributeValueDtos[j].productVariantId
              state = false
            }
            else if(i == response.data.length -1 && this.productVariantAttributes[i].productVariantAttributeValueDtos[j].quantity <= 0 )
            {
              this.price = 0;
              this.endProductVariantId = 0;
            }
             else {
              this.productVariantAttributes[i].productVariantAttributeValueDtos[j].isActiveAttribute = false
            }
          }
        }
      }
    })
  }

  getProduct(productId: number) {
    this.productService.getByProductDto(productId).subscribe((response) => {
      this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(response.data.description);
      this.product = response.data;
    });
  }

  getDefaultProductVariantDetail(productId: number, parentId: number) {
    var state = true;
    this.productVariantService.getDefaultProductVariantDetail(productId, parentId).subscribe(response => {
      console.log("Düzenlenmemiş response data", response.data)
      for (let i = 0; i < response.data.length; i++) {
        for (let j = 0; j < response.data[i].productVariantAttributeValueDtos.length; j++) {
          if (i != response.data.length -1 && j == 0) {
            response.data[i].productVariantAttributeValueDtos[j].isActiveAttribute = true
          }
          else if(i == response.data.length -1 && response.data[i].productVariantAttributeValueDtos[j].quantity > 0 && state == true)
          {
            response.data[i].productVariantAttributeValueDtos[j].isActiveAttribute = true
            this.price = response.data[i].productVariantAttributeValueDtos[j].price
            this.endProductVariantId = response.data[i].productVariantAttributeValueDtos[j].productVariantId
            console.log("Son Id", this.endProductVariantId)
            state = false
          }
          else if(i == response.data.length -1 && response.data[i].productVariantAttributeValueDtos[j].quantity <= 0){
            this.price = 0;
            this.endProductVariantId = 0;
          }
           else {
            response.data[i].productVariantAttributeValueDtos[j].isActiveAttribute = false
          }
        }
      }
      console.log("Düzenlenmiş response data", response.data)
      this.productVariantAttributes = response.data
      this.getProductVariantImage(parentId)
    })
  }

  getSubProductVariantDetail(productId: number, parentId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.productVariantService.getSubProductVariantDetail(this.productVariantAttributes, productId, parentId).subscribe(
        (response) => {
          this.productVariantAttributes = response.data;
          resolve(response); // Başarılı olduğunda resolve fonksiyonunu çağırarak Promise'i tamamla
        }
      );
    });
  }

  getProductVariantImage(productVariantId: number) {
    this.productImageService.getAllImageByProductVariantId(productVariantId).subscribe(response => {
      this.productImage = response.data
      console.log(response.data)
    })
  }

  writeStock(id : number, price : number){
    this.endProductVariantId = id
    this.price = price
  }
}
