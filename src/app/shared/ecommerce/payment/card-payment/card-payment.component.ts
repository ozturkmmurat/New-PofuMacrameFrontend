import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PaymentService } from 'src/app/services/HttpClient/paymentService/payment.service';

@Component({
  selector: 'app-card-payment',
  templateUrl: './card-payment.component.html',
  styleUrls: ['./card-payment.component.scss']
})
export class CardPaymentComponent {

  src : any

  constructor(private paymentService : PaymentService,
    private cookieService : CookieService,
    private router : Router) {
  }

  ngOnInit() {
    if (window.history.replaceState) {
      window.history.replaceState(null, null, window.location.href);
    }
      this.addJsToElement()
  }

  ngOnDestroy(){
    if (window.history.replaceState) {
      window.history.replaceState(null, null, window.location.href);
      window.location.href ="payment/paymentStatus/0"
    }
  }
  addJsToElement() {
    console.log("Src yazdırılıyor", this.src)
    this.src = this.paymentService.formScript()
    var str = this.src.split('<script type="text/javascript">').join("");
    var str2 = str.split("</script>").join("");
    const head = document.getElementsByTagName('head')[0];
    const js = document.createElement('script');
    js.type = 'text/javascript';
    js.appendChild(document.createTextNode(str2));
    head.appendChild(js);
    this.paymentService.setFormScript("")
  }
}
