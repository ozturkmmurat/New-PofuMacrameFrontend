import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
  public isCollapsed = true;
  currentSection = 'home';

    /**
  * Section changed method
  * @param sectionId specify the current sectionID
  */
    onSectionChange(sectionId: string) {
      this.currentSection = sectionId;
    }
}
