import { Component } from '@angular/core';
import { LoadingService } from 'src/app/services/Helper/loadingService/loading.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(
    public loadingService : LoadingService
  )
   { }
}
