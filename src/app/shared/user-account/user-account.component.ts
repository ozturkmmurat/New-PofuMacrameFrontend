import { Component } from '@angular/core';
import { TokenStorageService } from '../../core/services/token-storage.service';
@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent {
  userData:any;

  constructor() { }

  ngOnInit(): void { 
  }

  /**
  * Multiple Default Select2
  */
   selectValue = ['Illustrator', 'Photoshop', 'CSS', 'HTML', 'Javascript', 'Python', 'PHP'];
}
