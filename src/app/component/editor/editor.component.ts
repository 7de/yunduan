import {Component, forwardRef} from '@angular/core';
import {Config} from '../../config/config';
import {Cookie} from 'ng2-cookies';
import {LocalStorageService} from '../../service/local-storage.service';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator} from '@angular/forms';

@Component({
  selector: 'app-editor',
  template: `
    <div class="edit-con">
    <p-editor (onInit)="editorInit($event)" [style]="{'height':'320px'}"
              (onTextChange)="onChange($event)"></p-editor></div>
  `,
  styleUrls: ['./editor.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => EditorComponent), multi: true},
    {provide: NG_VALIDATORS, useExisting: forwardRef(() => EditorComponent), multi: true}
  ]
})
export class EditorComponent implements ControlValueAccessor, Validator {

  editor: any;

  api: string = Config.apiDomain;
  public data: any;
  private url: string;

  propagateChange: any = () => {
  };


  constructor(private localStorage: LocalStorageService) {
    const type = this.localStorage.getObject('companyType');
    if (type === 0) {
      this.url = this.api + Config.mainApiVersion + '/file/upload-img?fileType=image';
    }
    if (type === 1) {
      this.url = this.api + Config.mainApiBusiness + '/upload?fileType=image';
    }
  }

  public validate(c: FormControl) {
    return (this.data) ? null : {
      editorError: {
        valid: false,
      },
    };
  }

  // this is the initial value set to the component
  public writeValue(obj: any) {
    if (obj) {
      this.data = obj;
    }
  }

  // registers 'fn' that will be fired wheb changes are made
  // this is how we emit the changes back to the form
  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }


  // not used, used for touch input
  public registerOnTouched() {
  }

  // change events from the textarea
  onChange(event) {
    this.data = event.htmlValue;

    // update the form
    this.propagateChange(this.data);
  }

  /**
   * ba64转字符串
   * @param event
   */
  editorInit(event) {
    this.editor = event.editor;
    const toolbar = this.editor.getModule('toolbar');
    toolbar.addHandler('image', () => {
      this.selectLocalImage();
    });
  }

  /**
   * Step1. select local image
   *
   */
  selectLocalImage() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.click();

    // Listen upload local image and save to server
    input.onchange = () => {
      const file = input.files[0];

      // file type is only image.
      if (/^image\//.test(file.type)) {
        this.saveToServer(file);
      } else {
        // console.warn('You could only upload images.');
      }
    };
  }

  /**
   * Step2. save to server
   *
   * @param {File} file
   */
  saveToServer(file: File) {
    const fd = new FormData();
    fd.append('file', file);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', this.url, true);
    xhr.setRequestHeader('Authorization', Cookie.get('currentCompanyAuthorization'));
    xhr.onload = () => {
      if (xhr.status === 200) {
        // this is callback data: url
        const url = JSON.parse(xhr.responseText).data.filename;
        // ;(url);
        this.insertToEditor(url);
      }
    };
    xhr.send(fd);
  }

  /**
   * Step3. insert image url to rich editor.
   *
   * @param {string} url
   */
  insertToEditor(url: string) {
    // push image url to rich editor.
    const range = this.editor.getSelection();
    this.editor.insertEmbed(range.index, 'image', Config.imageDomain + `${url}`);
  }

}
