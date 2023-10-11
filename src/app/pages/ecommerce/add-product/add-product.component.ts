import { Component, OnInit } from '@angular/core';

// Ck Editer
import * as Editor from 'ckeditor5/build/ckeditor';
import { CkEditorConfigService } from 'src/app/services/Html/CKEditor5/ck-editor-config.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})

/**
 * AddProduct Component
 */
export class AddProductComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  public Editor = Editor;

  constructor(
    public ckEditorConfigService : CkEditorConfigService
  ) { }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Ecommerce' },
      { label: 'Create Product', active: true }
    ];
  }

  /**
  * Multiple Default Select2
  */
  selectValue = ['Choice 1', 'Choice 2', 'Choice 3'];

  // File Upload
  imageURL: string | undefined;
  fileChange(event: any) {
    let fileList: any = (event.target as HTMLInputElement);
    let file: File = fileList.files[0];
    document.getElementById('')

    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
      (document.getElementById('product-img') as HTMLImageElement).src = this.imageURL;
    }
    reader.readAsDataURL(file)
  }
}
