import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// Products Services
import { restApiService } from "../../../core/services/rest-api.service";

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
import { ProductVariantAttributeValueDto } from 'src/app/models/dtos/productVariant/select/productVarianAttributeValueDto';
import { CartService } from 'src/app/services/Html/cart/cart.service';
import { ProductStockService } from 'src/app/services/HttpClient/productStockService/product-stock.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { LoadingService } from 'src/app/services/Helper/loadingService/loading.service';

//Global Variable
const IMAGE_URL = GlobalComponent.IMAGE_URL;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

/**
 * ProductDetail Component
 */

export class ProductDetailComponent implements OnInit {

  //Model Start
  product: SelectProductDto;
  productVariantAttributes: ProductVariantGroupDetailDto[]
  productVariantAttributeValueDto: ProductVariantAttributeValueDto;
  productImage: ProductImage[]
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

  //Variable
  keepImage: string
  keepAttributeNameValue: string
  loadImageState = false

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  isImage: any;
  defaultSelect = 2;
  readonly = false;
  content?: any;

  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    public restApiService: restApiService,
    private productService: ProductService,
    private productVariantService: ProductVariantService,
    private sanitizer: DomSanitizer,
    private productImageService: ProductImageService,
    private navbarService: NavbarService,
    private cartService: CartService,
    private productStockService: ProductStockService,
    private toastrService: ToastrService,
    private cdr: ChangeDetectorRef,
    private loadingService: LoadingService
  ) {
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
    this.route.params.subscribe((params) => {
      if (params['productId'] && params['productVariantId']) {
        this.getProduct(params['productId']);
        this.getDefaultProductVariantDetail(params['productId'], params['productVariantId']);
        this.productVariantId = params['productVariantId']
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
    this.keepAttributeNameValue = ""
    const inputElement = ev.target.querySelector('input');
    if (inputElement && inputElement.disabled) {
      return;
    }
    const element = document.querySelectorAll('.' + className);
    if (element.length > 0) {
      element.forEach((el: any) => {
        el.classList.remove('active');
      });
      if (ev.target.classList.contains(className)) {
        ev.target.closest('.' + className).classList.add('active');
      }
    }

    this.activeAttributes = []
    for (let i = 0; i < this.productVariantAttributes.length; i++) {
      if (i < selectAttributeId) { // Seçilen attribute den onceki attributeler icin calistiriyoruz
        for (let j = 0; j < this.productVariantAttributes[i].productVariantAttributeValueDtos.length; j++) {
          if (this.productVariantAttributes[i].productVariantAttributeValueDtos[j].isActiveAttribute == true) { //Aktif attributelerin Array index ve productVariant list indexini alıyoruz
            const activeAttribute: ActiveAttribute = {
              attributeIndex: i,
              attributeListIndex: j
            };
            //keepAttributeNameValue' da onceki attributelerin attributeName ve attributeValuelarını alıp keepAttributeNameValue da tutuyoruz
            this.keepAttributeNameValue += this.productVariantAttributes[i].attributeName + ": " + this.productVariantAttributes[i].productVariantAttributeValueDtos[j].attributeValue + " "
            this.activeAttributes.push(activeAttribute)
          }
        }
      }
    }
    this.getSubProductVariantDetail(productId, parentId).then(response => {
      for (let k = 0; k < this.activeAttributes.length; k++) { // Kayıt altına alınan onceki aktif attributelerin uzunlugu kadar donuyoruz
        for (let i = 0; i < this.productVariantAttributes.length; i++) {
          if (this.activeAttributes[k].attributeIndex == i) { // Kayıt altındaki onceki attributelerin aktiflerini yeni gelen listede aktif yapıyoruz
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
        if (i == selectAttributeId) { // Tıklanan attribute durumu aktif hale getiriyoruz
          for (let j = 0; j < this.productVariantAttributes[i].productVariantAttributeValueDtos.length; j++) {
            if (j == selectAttributeListId) {
              this.productVariantAttributes[i].productVariantAttributeValueDtos[j].isActiveAttribute = true
              this.keepAttributeNameValue += this.productVariantAttributes[i].attributeName + ": " + this.productVariantAttributes[i].productVariantAttributeValueDtos[j].attributeValue + " "
            } else { //Tıklanan attribute grubundaki diger attributeleri false yani aktif olmayacak hale getiriyoruz
              this.productVariantAttributes[i].productVariantAttributeValueDtos[j].isActiveAttribute = false
            }
          }
        }
        if (i > selectAttributeId) {
          for (let j = 0; j < this.productVariantAttributes[i].productVariantAttributeValueDtos.length; j++) {
            if (i != response.data.length - 1 && j == 0) { // Tıklanan attribute grubundan sonra bir attribute grubu var ise bu attribute gruplarındaki ilk attribute aktif hale getiriyoruz
              this.productVariantAttributes[i].productVariantAttributeValueDtos[0].isActiveAttribute = true
            }
            //Eger son attribute grubunda isek quantity 0 dan buyuk ise gir eger daha once bu gruptan bir ozellik aktif hale gelmis ise state false hale getir
            else if (i == response.data.length - 1 && this.productVariantAttributes[i].productVariantAttributeValueDtos[j].quantity > 0 && state == true) {
              response.data[i].productVariantAttributeValueDtos[j].isActiveAttribute = true
              this.productVariantAttributeValueDto = response.data[i].productVariantAttributeValueDtos[j]
              this.productVariantAttributeValueDto.endProductVariantId = response.data[i].productVariantAttributeValueDtos[j].productVariantId
              this.keepAttributeNameValue += this.productVariantAttributes[i].attributeName + ": " + this.productVariantAttributes[i].productVariantAttributeValueDtos[j].attributeValue + " "

              this.productVariantAttributeValueDto.imagePath = response.data[i].productVariantAttributeValueDtos[0].imagePath
              state = false
            }
            //Eger son attribute grubunda isek ve quantity 0 eşit ve az ise bunlar ile iglili sepete ekleme gibi işlemleri aktif hale getirilemeyecek şekilde price ve endproductvariantId bilgilerini 0 olarak belirle
            else if (i == response.data.length - 1 && this.productVariantAttributes[i].productVariantAttributeValueDtos[j].quantity <= 0) {
              this.productVariantAttributeValueDto.price = 0;
              this.productVariantAttributeValueDto.endProductVariantId = 0;
              response.data[i].productVariantAttributeValueDtos[j].isActiveAttribute = false
            }
            //Eger tum bu kosullar saglanmıyor ise yani tıklanmayan attributeleri aktif hale getirme 
            //NOT: Aktif demek secili buton degil demek
            else {
              this.productVariantAttributes[i].productVariantAttributeValueDtos[j].isActiveAttribute = false
            }
          }
        }
      }
      this.cdr.detectChanges()

    })
  }

  getProduct(productId: number) {
    this.productService.getByProductDto(productId).subscribe((response) => {
      this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(response.data.description);
      this.product = response.data;
      this.cdr.detectChanges()
    });
  }

  getDefaultProductVariantDetail(productId: number, parentId: number) {
    var state = true;
    this.keepAttributeNameValue = ""
    this.productVariantService.getDefaultProductVariantDetail(productId, parentId).subscribe(response => {
      for (let i = 0; i < response.data.length; i++) {
        for (let j = 0; j < response.data[i].productVariantAttributeValueDtos.length; j++) {
          if (i != response.data.length - 1 && j == 0) {
            response.data[i].productVariantAttributeValueDtos[j].isActiveAttribute = true
            this.keepAttributeNameValue += response.data[i].attributeName + ": " + response.data[i].productVariantAttributeValueDtos[j].attributeValue + " "
          }
          else if (i == response.data.length - 1 && response.data[i].productVariantAttributeValueDtos[j].quantity > 0 && state == true) {
            response.data[i].productVariantAttributeValueDtos[j].isActiveAttribute = true
            this.productVariantAttributeValueDto = response.data[i].productVariantAttributeValueDtos[j]
            this.productVariantAttributeValueDto.endProductVariantId = response.data[i].productVariantAttributeValueDtos[j].productVariantId
            this.keepAttributeNameValue += " " + response.data[i].attributeName + ": " + response.data[i].productVariantAttributeValueDtos[j].attributeValue
            state = false
          }
          else if (i == response.data.length - 1 && response.data[i].productVariantAttributeValueDtos[j].quantity <= 0) {
            this.productVariantAttributeValueDto.price = 0;
            this.productVariantAttributeValueDto.endProductVariantId = 0;
          }
          else {
            response.data[i].productVariantAttributeValueDtos[j].isActiveAttribute = false
          }
        }
      }
      this.productVariantAttributes = response.data
      this.getProductVariantImage(parentId)

      this.cdr.detectChanges()

    })
  }

  getSubProductVariantDetail(productId: number, parentId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      this.productVariantService.getSubProductVariantDetail(this.productVariantAttributes, productId, parentId).subscribe(
        (response) => {
          this.productVariantAttributes = response.data;
          resolve(response);
        }
      );
    });
  }

  getProductVariantImage(productVariantId: number) {
    this.productImageService.getAllImageByProductVariantId(productVariantId).subscribe(response => {
      this.productImage = response.data
      console.log(response.data)
      this.keepImage = response.data.find(x => x.isMain == true).path
      this.loadImageState = true
      this.cdr.detectChanges()
    })
  }

  writeStock(id: number, price: number) {
    this.productVariantAttributeValueDto.endProductVariantId = id
    this.productVariantAttributeValueDto.price = price
  }

  addCart() {
    var checkStock = this.checkProductStockByPvId(this.productVariantAttributeValueDto.endProductVariantId)
    if (checkStock) {
      const productVariant: ProductVariantAttributeValueDto = Object.assign({}, this.productVariantAttributeValueDto);
      productVariant.attributeValue = this.product.productName + " " + this.keepAttributeNameValue
      productVariant.imagePath = this.keepImage
      this.cartService.addToCart(productVariant);
      this.toastrService.success("Ürün başarıyla sepete eklendi.")
    } else {
      this.toastrService.error("Ürün stokta bulunamadı.")
    }
  }

  checkProductStockByPvId(productVariantId: number) {
    return this.productStockService.getByProductVariantId(productVariantId).pipe(
      map(response => {
        if (response.data.quantity) {
          return true;
        }
        return false;
      })
    );
  }
}

