import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild, effect, signal} from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/auth.models';
import { SelectCategoryDto } from 'src/app/models/dtos/category/select/selectCategoryDto';
import { SiteContent } from 'src/app/models/siteContent/siteContent';
import { JwtService } from 'src/app/services/Helper/jwtService/jwt.service';
import { LocalStorageService } from 'src/app/services/Helper/localStorageService/local-storage.service';
import { CategoryService } from 'src/app/services/HttpClient/categoryService/category.service';
import { SiteContentService } from 'src/app/services/HttpClient/siteContentService/site-content.service';
import { UserService } from 'src/app/services/HttpClient/userService/user.service';

const SOCIAL_CONTENT_KEYS = ['Whatsapp', 'Instagram'];

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
  public isCollapsed = true;

  currentSection = 'home';
  user: User;
  categories: SelectCategoryDto[] = [];
  socialLinks: SiteContent[] = [];

  constructor(
    private localStorageService: LocalStorageService,
    private userService: UserService,
    private categoryService: CategoryService,
    private siteContentService: SiteContentService,
    private router: Router,
    private elementRef: ElementRef
  ) {
    this.loadingUser();
  }

  ngOnInit() {
    this.getAllCategoryHierarchy();
    this.loadSocialLinks();
  }

  loadSocialLinks() {
    this.siteContentService.getAll().subscribe(response => {
      const data = response.data || [];
      this.socialLinks = data
        .filter((c: SiteContent) => SOCIAL_CONTENT_KEYS.includes(c.contentKey))
        .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
    });
  }

  getSocialIconClass(contentKey: string): string {
    if (contentKey === 'Whatsapp') return 'ri-whatsapp-line fs-18';
    if (contentKey === 'Instagram') return 'ri-instagram-line fs-18';
    return 'ri-link fs-18';
  }


  getAllCategoryHierarchy(){
    this.categoryService.getAllCategoryHierarchy().subscribe(response => {
      this.categories = response.data
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
