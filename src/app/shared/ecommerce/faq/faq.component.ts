import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SiteContent } from 'src/app/models/siteContent/siteContent';
import { SiteContentService } from 'src/app/services/HttpClient/siteContentService/site-content.service';

const CONTENT_KEY = 'S.S.S';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  pageTitle = 'S.S.S';
  pageDescription = '';
  faqItems: SiteContent[] = [];
  loading = true;

  constructor(
    private siteContentService: SiteContentService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadFaq();
  }

  loadFaq(): void {
    this.loading = true;
    this.siteContentService.getAllByContentKey(CONTENT_KEY).subscribe({
      next: response => {
        const data = response.data || [];
        const items = Array.isArray(data) ? data : [data];
        this.faqItems = items
          .filter((c: SiteContent) => c.status !== false)
          .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
        if (this.faqItems.length > 0) {
          this.pageTitle = this.faqItems[0].title || 'S.S.S';
          this.pageDescription = this.faqItems[0].description || '';
        }
        this.loading = false;
      },
      error: () => {
        this.faqItems = [];
        this.loading = false;
      }
    });
  }

  getSafeHtml(html: string): SafeHtml {
    if (!html) return '';
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
