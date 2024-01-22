import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild, effect, signal} from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/auth.models';
import { SelectCategoryDto } from 'src/app/models/dtos/category/select/selectCategoryDto';
import { JwtService } from 'src/app/services/Helper/jwtService/jwt.service';
import { LocalStorageService } from 'src/app/services/Helper/localStorageService/local-storage.service';
import { CategoryService } from 'src/app/services/HttpClient/categoryService/category.service';
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
  categories : SelectCategoryDto[] = []

  constructor(private localStorageService : LocalStorageService,
    private userService : UserService,
    private categoryService : CategoryService,
    private router : Router,
    private elementRef: ElementRef) {
     this.loadingUser()
  }


  ngOnInit(){
    this.getAllCategoryHierarchy()
  }


  getAllCategoryHierarchy(){
    this.categoryService.getAllCategoryHierarchy().subscribe(response => {
      this.categories = response.data
      console.log("Category data", response.data)
    })
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
      this.userService._user.set(null);
      this.router.navigate([""]);

    }

    isDropdownOpen: boolean[] = Array(this.categories.length).fill(false);

    toggleDropdown(index: number) {
      this.isDropdownOpen[index] = !this.isDropdownOpen[index];
    }
  
    showDropdown(index: number) {
      this.isDropdownOpen[index] = true;
    }
  
    hideDropdown(index: number) {
      this.isDropdownOpen[index] = false;
    }

  onDropdownClick(event: Event) {
    // Bu kısmın eklenmesi, dropdown içindeki öğelere tıklandığında döküman tıklamasının
    // etkisiz hale getirilmesini sağlar ve dropdown'ın kapanmasını engeller.
    event.stopPropagation();
  }
}
