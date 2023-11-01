import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { cartData } from '../layouts/topbar/data';
import { CartModel } from '../layouts/topbar/topbar.model';
import { LoadingService } from '../services/Helper/loadingService/loading.service';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'

@Component({
  selector: 'app-main-landing',
  templateUrl: './main-landing.component.html',
  styleUrls: ['./main-landing.component.scss'],
})
export class MainLandingComponent {
  currentSection = 'home';
  cartData!: CartModel[];
  total = 0;
  cart_length: any = 0;
  public isCollapsed = true;
  //
    public showOverlay = true;

  
  constructor(
    public loadingService : LoadingService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    })
   }

  ngOnInit(): void {
     //  Fetch Data
     this.cartData = cartData;
     this.cart_length = this.cartData.length;
     this.cartData.forEach((item) => {
       var item_price = item.quantity * item.price
       this.total += item_price
     });
     this.LoadCss()
  }

  /**
   * Window scroll method
   */
  // tslint:disable-next-line: typedef
  windowScroll() {
    const navbar = document.getElementById('navbar');
    if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
      navbar?.classList.add('is-sticky');
    }
    else {
      navbar?.classList.remove('is-sticky');
    }

    // Top Btn Set
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      (document.getElementById("back-to-top") as HTMLElement).style.display = "block"
    } else {
      (document.getElementById("back-to-top") as HTMLElement).style.display = "none"
    }
  }

  /**
  * Section changed method
  * @param sectionId specify the current sectionID
  */
  onSectionChange(sectionId: string) {
    this.currentSection = sectionId;
  }

  /**
   * Toggle navbar
   */
  toggleMenu() {
    document.getElementById('navbarSupportedContent')?.classList.toggle('show');
  }

  // When the user clicks on the button, scroll to the top of the document
  topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  deleteItem(event: any, id: any) {
    var price = event.target.closest('.dropdown-item').querySelector('.item_price').innerHTML;
    var Total_price = this.total - price;
    this.total = Total_price;
    this.cart_length = this.cart_length - 1;
    this.total > 1 ? (document.getElementById("empty-cart") as HTMLElement).style.display = "none" : (document.getElementById("empty-cart") as HTMLElement).style.display = "block";
    document.getElementById('item_' + id)?.remove();
  }

  LoadCss(){
    this.bodyBackground();
  }

  bodyBackground(){
    var body = document.querySelector('body');
    if(body){
      body.style.backgroundColor = "#F8F9FA"
    }
  }


    // Shows and hides the loading spinner during RouterEvent changes
    navigationInterceptor(event: RouterEvent): void {
      if (event instanceof NavigationStart) {
        console.log("Çalıştı")
        this.showOverlay = true;
      }
      if (event instanceof NavigationEnd) {
        this.showOverlay = false;
      }
  
      // Set loading state to false in both of the below events to hide the spinner in case a request fails
      if (event instanceof NavigationCancel) {
        this.showOverlay = false;
      }
      if (event instanceof NavigationError) {
        this.showOverlay = false;
      }
    }
}
