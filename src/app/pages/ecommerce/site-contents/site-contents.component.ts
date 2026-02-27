import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, catchError } from 'rxjs';
import { GlobalComponent } from 'src/app/global-component';
import { SiteContent } from 'src/app/models/siteContent/siteContent';
import { ErrorService } from 'src/app/services/Helper/errorService/error.service';
import { SiteContentService } from 'src/app/services/HttpClient/siteContentService/site-content.service';

const IMAGE_URL = GlobalComponent.IMAGE_URL;

@Component({
  selector: 'app-site-contents',
  templateUrl: './site-contents.component.html',
  styleUrls: ['./site-contents.component.scss'],
})
export class SiteContentsComponent {
  siteContents: SiteContent[] = [];
  _siteContentForm: FormGroup;
  selectedFile: File | null = null;
  imageUrl = IMAGE_URL;

  
  contentTypes = [
    { label: 'Anasayfa Slider', value: 'Anasayfa Slider' },
  ];

  constructor(
    private siteContentService: SiteContentService,
    private formBuilder: FormBuilder,
    private errorService: ErrorService,
    private modalService: NgbModal,
    private toastrService: ToastrService
  ) {}

  ngOnInit() {
    this.getAll();
    this.siteContentForm();
  }

  siteContentForm() {
    this._siteContentForm = this.formBuilder.group({
      id: [0],
      contentKey: ['HomeSlider', Validators.required],
      title: ['', Validators.required],
      description: [''],
      imageUrl: [''],
      linkUrl: [''],
      displayOrder: [0, Validators.required],
      status: [true],
    });
  }

  loadSiteContentForm(item: SiteContent) {
    this._siteContentForm.patchValue({
      id: item.id,
      contentKey: item.contentKey || 'HomeSlider',
      title: item.title,
      description: item.description || '',
      imageUrl: item.imageUrl || '',
      linkUrl: item.linkUrl || '',
      displayOrder: item.displayOrder ?? 0,
      status: item.status ?? true,
    });
  }

  resetSiteContentForm() {
    this.selectedFile = null;
    this._siteContentForm.patchValue({
      id: 0,
      contentKey: 'HomeSlider',
      title: '',
      description: '',
      imageUrl: '',
      linkUrl: '',
      displayOrder: 0,
      status: true,
    });
  }

  onContentTypeChange() {
    const selected = this.contentTypes.find(
      (c) => c.value === this._siteContentForm.get('contentKey')?.value
    );
    if (selected) {
      this._siteContentForm.get('contentKey')?.setValue(selected.value);
    }
  }

  getAll() {
    this.siteContentService.getAll().subscribe((response) => {
      this.siteContents = response.data || [];
    });
  }

  buildFormData(forUpdate: boolean): FormData {
    const formData = new FormData();
    const v = this._siteContentForm.value;
    formData.append('Id', String(v.id));
    formData.append('ContentKey', v.contentKey || '');
    formData.append('Title', v.title || '');
    formData.append('Description', v.description || '');
    formData.append('ImageUrl', v.imageUrl || '');
    formData.append('LinkUrl', v.linkUrl || '');
    formData.append('DisplayOrder', String(v.displayOrder ?? 0));
    formData.append('Status', String(v.status ?? true));
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }
    return formData;
  }

  add() {
    const formData = this.buildFormData(false);
    this.siteContentService
      .add(formData)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorService.checkError(err);
          return EMPTY;
        })
      )
      .subscribe((response) => {
        this.getAll();
        this.toastrService.success(response.message, 'Başarılı');
        this.modalService.dismissAll();
        this.resetSiteContentForm();
      });
  }

  update() {
    const formData = this.buildFormData(true);
    this.siteContentService
      .update(formData)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorService.checkError(err);
          return EMPTY;
        })
      )
      .subscribe((response) => {
        this.getAll();
        this.toastrService.success(response.message, 'Başarılı');
        this.modalService.dismissAll();
        this.resetSiteContentForm();
      });
  }

  deleteRow(siteContent: SiteContent) {
    if (!confirm('Bu kaydı silmek istediğinize emin misiniz?')) return;
    this.siteContentService
      .delete(siteContent)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.errorService.checkError(err);
          return EMPTY;
        })
      )
      .subscribe((response) => {
        this.getAll();
        this.toastrService.success(response.message, 'Başarılı');
      });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  clearSelectedFile() {
    this.selectedFile = null;
  }

  @ViewChild('addSiteContentModal') addSiteContentModal: any;

  async openAddModal() {
    this.resetSiteContentForm();
    this.modalService.open(this.addSiteContentModal, {
      size: 'xl',
      centered: true,
    });
  }

  @ViewChild('updateSiteContentModal') updateSiteContentModal: any;

  async openUpdateModal(item: SiteContent) {
    this.resetSiteContentForm();
    this.loadSiteContentForm(item);
    this.modalService.open(this.updateSiteContentModal, {
      size: 'xl',
      centered: true,
    });
  }
}
