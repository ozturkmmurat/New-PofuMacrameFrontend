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
import { ProductStock } from 'src/app/models/productStock/prodcutStock';
import { map } from 'rxjs';
import { LoadingService } from 'src/app/services/Helper/loadingService/loading.service';
import { ProductPriceFactorService } from 'src/app/services/HttpClient/productPriceFactorService/product-price-factor.service';
import { ProductPriceFactor } from 'src/app/models/productPriceFactor/product-price-factor';
import { DistrictService } from 'src/app/services/HttpClient/districtService/district.service';
import { District } from 'src/app/models/district/district';

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

  // İlçe / fiyat çarpanı (ProductPriceFactor)
  productPriceFactors: ProductPriceFactor[] = [];
  districts: District[] = [];
  selectedPriceFactor: ProductPriceFactor | null = null;

  // Teslimat tarihi ve saat aralığı (UI)
  deliveryDateStr: string = '';            // 'YYYY-MM-DD' formatında
  minDeliveryDateStr: string = '';         // tarih inputu için minimum
  timeSlots: Array<{ id: '09-12' | '12-15' | '15-18'; label: string; disabled: boolean }> = [
    { id: '09-12', label: '09:00-12:00', disabled: false },
    { id: '12-15', label: '12:00-15:00', disabled: false },
    { id: '15-18', label: '15:00-18:00', disabled: false }
  ];
  selectedTimeSlotId: '09-12' | '12-15' | '15-18' = '09-12';

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  isImage: any;
  defaultSelect = 2;
  readonly = false;
  content?: any;

  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;

  constructor(
    private route: ActivatedRoute,
    public restApiService: restApiService,
    private productService: ProductService,
    private productVariantService: ProductVariantService,
    private sanitizer: DomSanitizer,
    private productImageService: ProductImageService,
    private cartService: CartService,
    private productStockService: ProductStockService,
    private toastrService: ToastrService,
    private cdr: ChangeDetectorRef,
    private productPriceFactorService: ProductPriceFactorService,
    private districtService: DistrictService,
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
    this.loadProductPriceFactors();
    this.loadDistricts();

    // Sepet boşken teslimat tarih / saat varsayılanlarını ayarla
    this.initDeliveryDefaults();
  }

  get isCartEmpty(): boolean {
    return (this.cartService.cartItemList()?.length ?? 0) === 0;
  }

  loadProductPriceFactors() {
    this.productPriceFactorService.getAllAsNoTracking().subscribe((res) => {
      this.productPriceFactors = (res.data || []).filter((f) => f.status);
      if (!this.isCartEmpty) {
        const defaultId = this.cartService.defaultProductPriceFactorId;
        this.selectedPriceFactor = this.productPriceFactors.find((f) => f.id === defaultId) ?? null;
      }
      else{
        this.selectedPriceFactor = this.productPriceFactors[0];
      }
      this.cdr.detectChanges();
    });
  }

  loadDistricts() {
    this.districtService.getAllAsNoTracking().subscribe((res) => {
      this.districts = res.data || [];
      this.cdr.detectChanges();
    });
  }

  getDistrictName(districtId: number): string {
    return this.districts.find((d) => d.id === districtId)?.name ?? '';
  }

  onDistrictChange(): void {
    this.cdr.detectChanges();
  }

  // --- Teslimat tarih & saat slotu yardımcı fonksiyonları ---
  private toDateStr(d: Date): string {
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private setDisabled(ids: Array<'09-12' | '12-15' | '15-18'>): void {
    this.timeSlots.forEach(slot => {
      slot.disabled = ids.includes(slot.id);
    });
  }

  private resetDisabled(): void {
    this.timeSlots.forEach(slot => slot.disabled = false);
  }

  /** Sepet boşken ilk girişte teslimat tarih/saat varsayılanlarını ve kısıtlarını ayarlar */
  private initDeliveryDefaults(): void {
    if (!this.isCartEmpty) {
      return;
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const hour = now.getHours() + now.getMinutes() / 60;

    this.resetDisabled();

    // Tarihte geri seçilebilecek en erken gün:
    // - 18:00'den önce -> bugün
    // - 18:00 ve sonrası -> yarın (bugün seçilemez)
    if (hour < 18) {
      this.minDeliveryDateStr = this.toDateStr(today);
    } else {
      this.minDeliveryDateStr = this.toDateStr(tomorrow);
    }

    if (hour < 9) {
      // 09:00'dan önce -> bugün, tüm saat aralıkları seçilebilir, varsayılan 09-12
      this.deliveryDateStr = this.toDateStr(today);
      this.selectedTimeSlotId = '09-12';
    } else if (hour < 12) {
      // 09:00–12:00 arası -> bugün, varsayılan 12-15, 09-12 pasif
      this.deliveryDateStr = this.toDateStr(today);
      this.selectedTimeSlotId = '12-15';
      this.setDisabled(['09-12']);
    } else if (hour < 15) {
      // 12:00–15:00 arası -> bugün, varsayılan 15-18, 09-12 ve 12-15 pasif
      this.deliveryDateStr = this.toDateStr(today);
      this.selectedTimeSlotId = '15-18';
      this.setDisabled(['09-12', '12-15']);
    } else if (hour < 18) {
      // 15:00–18:00 arası -> bugün, varsayılan 15-18, 09-12 ve 12-15 pasif kalır
      this.deliveryDateStr = this.toDateStr(today);
      this.selectedTimeSlotId = '15-18';
      this.setDisabled(['09-12', '12-15']);
    } else {
      // 18:00 sonrası -> ertesi gün, default 09-12
      this.deliveryDateStr = this.toDateStr(tomorrow);
      this.selectedTimeSlotId = '09-12';
    }
  }

  /** UI'da seçilen tarihe ve zaman aralığına göre Date nesneleri üretir */
  private getRequestedDeliveryRange(): { start: Date; end: Date } {
    if (!this.deliveryDateStr || !this.selectedTimeSlotId) {
      const today = new Date();
      this.deliveryDateStr = this.toDateStr(today);
      this.selectedTimeSlotId = '09-12';
    }

    let startHour = 9;
    let endHour = 12;

    if (this.selectedTimeSlotId === '12-15') {
      startHour = 12;
      endHour = 15;
    } else if (this.selectedTimeSlotId === '15-18') {
      startHour = 15;
      endHour = 18;
    }

    const [year, month, day] = this.deliveryDateStr.split('-').map(v => Number(v));
    const start = new Date(year, (month || 1) - 1, day || 1, startHour, 0, 0);
    const end = new Date(year, (month || 1) - 1, day || 1, endHour, 0, 0);

    return { start, end };
  }

  /** Ürün detayda her zaman sadece varyantın kendi fiyatı gösterilir; ilçe seçimi fiyatı değiştirmez */
  get displayNetPrice(): number {
    return this.productVariantAttributeValueDto?.netPrice ?? 0;
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
      var state = true
      for (let i = 0; i < this.productVariantAttributes.length; i++) {
        if (i == selectAttributeId) {
          for (let j = 0; j < this.productVariantAttributes[i].productVariantAttributeValueDtos.length; j++) {
            if (j == selectAttributeListId) {
              this.productVariantAttributes[i].productVariantAttributeValueDtos[j].isActiveAttribute = true
              this.keepAttributeNameValue += this.productVariantAttributes[i].attributeName + ": " + this.productVariantAttributes[i].productVariantAttributeValueDtos[j].attributeValue + " "
            } else {
              this.productVariantAttributes[i].productVariantAttributeValueDtos[j].isActiveAttribute = false
            }
          }
        }
        if (i > selectAttributeId) {
          for (let j = 0; j < this.productVariantAttributes[i].productVariantAttributeValueDtos.length; j++) {
            if (i != response.data.length - 1 && j == 0) {
              this.productVariantAttributes[i].productVariantAttributeValueDtos[0].isActiveAttribute = true
            }
            else if (i == response.data.length - 1 && this.productVariantAttributes[i].productVariantAttributeValueDtos[j].quantity > 0 && state == true) {
              response.data[i].productVariantAttributeValueDtos[j].isActiveAttribute = true
              this.keepAttributeNameValue += this.productVariantAttributes[i].attributeName + ": " + this.productVariantAttributes[i].productVariantAttributeValueDtos[j].attributeValue + " "
              state = false
            }
            else if (i == response.data.length - 1 && this.productVariantAttributes[i].productVariantAttributeValueDtos[j].quantity <= 0) {
              response.data[i].productVariantAttributeValueDtos[j].isActiveAttribute = false
            }
            else {
              this.productVariantAttributes[i].productVariantAttributeValueDtos[j].isActiveAttribute = false
            }
          }
        }
      }
      this.setProductVariantDtoFromActiveInLastGroup()
      this.cdr.detectChanges()
    })
  }

  getProduct(productId: number) {
    this.productService.getByProductDto(productId).subscribe((response) => {
      this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(response.data.description);
      this.product = response.data;
      console.log("Product Detail", this.product)
      this.cdr.detectChanges()
    });
  }

  getDefaultProductVariantDetail(productId: number, parentId: number) {
    this.keepAttributeNameValue = ""
    this.productVariantService.getDefaultProductVariantDetail(productId, parentId).subscribe(response => {
      if (!response.data || response.data.length === 0) {
        this.productVariantAttributes = []
        this.loadProductVariantValueDtoForNoVariant(productId, parentId)
        this.getProductVariantImage(parentId)
        this.cdr.detectChanges()
        return
      }
      var state = true
      for (let i = 0; i < response.data.length; i++) {
        for (let j = 0; j < response.data[i].productVariantAttributeValueDtos.length; j++) {
          if (i != response.data.length - 1 && j == 0) {
            response.data[i].productVariantAttributeValueDtos[j].isActiveAttribute = true
            this.keepAttributeNameValue += response.data[i].attributeName + ": " + response.data[i].productVariantAttributeValueDtos[j].attributeValue + " "
          }
          else if (i == response.data.length - 1 && response.data[i].productVariantAttributeValueDtos[j].quantity > 0 && state == true) {
            response.data[i].productVariantAttributeValueDtos[j].isActiveAttribute = true
            this.keepAttributeNameValue += " " + response.data[i].attributeName + ": " + response.data[i].productVariantAttributeValueDtos[j].attributeValue
            state = false
          }
          else if (i == response.data.length - 1 && response.data[i].productVariantAttributeValueDtos[j].quantity <= 0) {
            response.data[i].productVariantAttributeValueDtos[j].isActiveAttribute = false
          }
          else {
            response.data[i].productVariantAttributeValueDtos[j].isActiveAttribute = false
          }
        }
      }
      this.productVariantAttributes = response.data
      this.setProductVariantDtoFromActiveInLastGroup()
      this.getProductVariantImage(parentId)
      this.cdr.detectChanges()
    })
  }

  /** Varyantsız ürün için tek varyantın fiyatını ve Sepete Ekle için DTO'yu doldurur */
  loadProductVariantValueDtoForNoVariant(productId: number, productVariantId: number) {
    this.productStockService.getByProductVariantId(productVariantId).subscribe(res => {
      const stock: ProductStock = res.data
      if (!this.productVariantAttributeValueDto) {
        this.productVariantAttributeValueDto = {} as ProductVariantAttributeValueDto
      }
      this.productVariantAttributeValueDto.productId = productId
      this.productVariantAttributeValueDto.productVariantId = productVariantId
      this.productVariantAttributeValueDto.endProductVariantId = productVariantId
      this.productVariantAttributeValueDto.price = stock.price
      this.productVariantAttributeValueDto.netPrice = stock.netPrice
      this.productVariantAttributeValueDto.kdv = stock.kdv
      this.productVariantAttributeValueDto.quantity = stock.quantity
      this.productVariantAttributeValueDto.attributeValue = ''
      this.cdr.detectChanges()
    })
  }

  /** Son varyant grubunda seçili (isActiveAttribute) olan elemana göre fiyat DTO'sunu günceller */
  setProductVariantDtoFromActiveInLastGroup() {
    if (!this.productVariantAttributes?.length) return
    const lastGroup = this.productVariantAttributes[this.productVariantAttributes.length - 1]
    const activeDto = lastGroup?.productVariantAttributeValueDtos?.find(dto => dto.isActiveAttribute)
    if (activeDto) {
      if (!this.productVariantAttributeValueDto) {
        this.productVariantAttributeValueDto = {} as ProductVariantAttributeValueDto
      }
      Object.assign(this.productVariantAttributeValueDto, activeDto)
      this.productVariantAttributeValueDto.endProductVariantId = activeDto.quantity > 0 ? activeDto.productVariantId : 0
      if (activeDto.quantity <= 0) {
        this.productVariantAttributeValueDto.price = 0
        this.productVariantAttributeValueDto.netPrice = 0
      }
    }
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

  writeStock(id: number, price: number, netPrice : number) {
    this.productVariantAttributeValueDto.endProductVariantId = id
    this.productVariantAttributeValueDto.price = price
    this.productVariantAttributeValueDto.netPrice = netPrice
  }

  addCart() {
    const endProductVariantId = this.productVariantAttributeValueDto.endProductVariantId;
    if (!endProductVariantId) {
      this.toastrService.error("Ürün stokta bulunamadı.");
      return;
    }

    const checkStock$ = this.checkProductStockByPvId(endProductVariantId);

    checkStock$.subscribe(checkStock => {
      if (checkStock) {
        const productVariant: ProductVariantAttributeValueDto = Object.assign({}, this.productVariantAttributeValueDto);
        productVariant.attributeValue = this.keepAttributeNameValue;
        productVariant.productName = this.product.productName;
        productVariant.categoryName = this.product.categoryName;
        productVariant.imagePath = this.keepImage;
        console.log("Sepete eklenen ürünün bilgisi", productVariant);

        // İlk ürün eklenirken teslimat tarih/saat aralığını sepet servisine yaz
        if (this.isCartEmpty) {
          const range = this.getRequestedDeliveryRange();
          this.cartService.setRequestedDeliveryRange(range.start, range.end);
        }

        const productPriceFactorId = this.isCartEmpty
          ? (this.selectedPriceFactor?.id ?? 0)
          : this.cartService.defaultProductPriceFactorId;

        this.cartService.addToCart(productVariant, productPriceFactorId);
        this.toastrService.success("Ürün başarıyla sepete eklendi.");
      } else {
        this.toastrService.error("Ürün stokta bulunamadı.");
      }
    });
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

