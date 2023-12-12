import { Component } from '@angular/core';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'
import { LocalStorageService } from './services/Helper/localStorageService/local-storage.service';
import { UserService } from './services/HttpClient/userService/user.service';
import { AuthService } from './services/HttpClient/authService/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'velzon';

  public showOverlay = true;

  constructor(private router: Router,
    private localStorageService : LocalStorageService,
    private userService : UserService,
    private authService : AuthService) {

    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    })
  }

  ngOnInit(){
    this.loadUser()
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

  loadUser(){
    if(this.localStorageService.getToken != null){
    this.userService.setCurrentUser()
  }
  else{
    this.authService.logOut()
  }
}
}
