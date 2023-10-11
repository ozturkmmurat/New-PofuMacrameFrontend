import { Component, OnInit } from '@angular/core';

// Ck Editer
import * as Editor from 'ckeditor5/build/ckeditor';

@Component({
  selector: 'app-editors',
  templateUrl: './editors.component.html',
  styleUrls: ['./editors.component.scss']
})

/**
 * Editors Component
 */
export class EditorsComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  public Editor = Editor;

  constructor() { }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Forms' },
      { label: 'Editors', active: true }
    ];
  }

}
