import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/Helper/loadingService/loading.service';
import { SiteContent } from 'src/app/models/siteContent/siteContent';
import { SiteContentService } from 'src/app/services/HttpClient/siteContentService/site-content.service';

const SOCIAL_CONTENT_KEYS = ['Whatsapp', 'Instagram'];

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  year = new Date().getFullYear();
  socialLinks: SiteContent[] = [];

  constructor(
    public loadingService: LoadingService,
    private siteContentService: SiteContentService
  ) { }

  ngOnInit() {
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
    if (contentKey === 'Whatsapp') return 'ri-whatsapp-line fs-16';
    if (contentKey === 'Instagram') return 'ri-instagram-line fs-16';
    return 'ri-link fs-16';
  }
}
