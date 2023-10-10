import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CkEditorConfigService {

  constructor() { }
  public editorConfig = {
    allowedContent: true, // Tüm içeriği izin ver
    extraAllowedContent: '*(*){*}', // Tüm HTML etiketlerini ve özellikleri izin ver
    toolbar: {
      items: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        'bulletedList',
        'numberedList',
        '|',
        'outdent',
        'indent',
        '|',
        'imageUpload',
        'blockQuote',
        'insertTable',
        'mediaEmbed',
        'undo',
        'redo',
        'style',
        'findAndReplace',
        'alignment',
        'fontBackgroundColor',
        'fontColor',
        'fontFamily',
        'fontSize',
        'underline',
        'code',
        'codeBlock',
        'restrictedEditingException',
        'htmlEmbed',
        'selectAll',
        'showBlocks',
      ],
    },
    language: 'tr',
    image: {
      toolbar: [
        'imageTextAlternative',
        'toggleImageCaption',
        'imageStyle:inline',
        'imageStyle:block',
        'imageStyle:side',
      ],
    },
    table: {
      contentToolbar: [
        'tableColumn',
        'tableRow',
        'mergeTableCells',
        'tableCellProperties',
        'tableProperties',
      ],
    },
  };
}
