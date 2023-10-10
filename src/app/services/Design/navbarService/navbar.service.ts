import { Injectable } from '@angular/core';
import { HtmlEditService } from '../../Html/HtmlEdit/html-edit.service';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor(private htmlEditService : HtmlEditService) { }

  deleteFixedTopClass(){
    this.htmlEditService.deleteClass("navbar","undefined","fixed-top")
  }
}
