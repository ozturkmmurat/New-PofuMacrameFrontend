import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, signal} from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/auth.models';
import { JwtService } from 'src/app/services/Helper/jwtService/jwt.service';
import { LocalStorageService } from 'src/app/services/Helper/localStorageService/local-storage.service';
import { UserService } from 'src/app/services/HttpClient/userService/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
  public isCollapsed = true;
  currentSection = 'home';
  user:User

  constructor(private localStorageService : LocalStorageService,
    private userService : UserService,
    private router : Router) {
     this.loadingUser()
  }
  
    /**
  * Section changed method
  * @param sectionId specify the current sectionID
  */
    onSectionChange(sectionId: string) {
      this.currentSection = sectionId;
    }

    loadingUser(){
      effect(() => {
        this.user = this.userService._user();
        console.log("NavbarComponent'teki user", this.user);
      });
    }

    logOut(){
      this.localStorageService.removeTokens()
      this.userService._user.update(null);
      this.router.navigate(["/auth/login"]);

    }
}
