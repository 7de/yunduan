import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Config} from '../../config/config';
import {Cookie} from 'ng2-cookies';
import {FlashMessagesService} from '../../service/flash-messages.service';
import {DomSanitizer} from '@angular/platform-browser';
import {SetupHelper} from '../../common/helper/setup-helper';
import {LocalStorageService} from '../../service/local-storage.service';

@Component({
  selector: 'app-basic-img-upload',
  templateUrl: './basic-img-upload.component.html',
  styleUrls: ['./basic-img-upload.component.scss']
})
export class BasicImgUploadComponent implements OnChanges {
  @Input() previewImg: string;
  @Output() imgEvent = new EventEmitter();
  @Input() selectPreview = true; // 是否开启上传后读取本地文件预览，默认开启。多图上传的时候必须要设置为false
  img; // 图片
  api: string = Config.apiDomain;
  public url: string;
  imgSrc; // 图片路径
  constructor(private flashMessages: FlashMessagesService,
              private localStorage: LocalStorageService,
              public sanitizer: DomSanitizer) {
    const type = this.localStorage.getObject('companyType');
    if (type === 0) {
      this.url = this.api + Config.mainApiVersion + '/file/upload-img?fileType=image';
    }
    if (type === 1) {
      this.url = this.api + Config.mainApiBusiness + '/upload?fileType=image';
    }
    /*if (type === 0 || type === 1) {
      this.url = this.api + Config.mainApiVersion + '/file/upload-img?fileType=image';
    }
    if (type === 2) {
      this.url = this.api + Config.mainApiBusiness + '/upload?fileType=image';
    }*/
  }

  onBasicUpload(event) {
    let data = JSON.parse(event.xhr.response);
    if (data.code === 0) {
      this.imgSrc = data.data.filename;
      this.imgEvent.emit(this.imgSrc);
    } else {
      this.flashMessages.wechaterr('请重新上传');
    }
  }

  /**
   * 解决 previewImg 参数不更新
   * @param {SimpleChanges} changes
   */
  ngOnChanges(changes: SimpleChanges) {
    this.previewImg = changes['previewImg'].currentValue;
    let previewImgUrl = Config.imageDomain + this.previewImg;
    this.img = this.img === previewImgUrl ? this.img : (this.previewImg && SetupHelper.validateImage(this.previewImg) ? previewImgUrl : '');
  }

  onBeforeSend(event) {
    event.xhr.setRequestHeader('Authorization', Cookie.get('currentCompanyAuthorization'));
  }

  onSelect(event) {
    if (event.files[0].size > 2048000) {
      // this.img = '';
      this.flashMessages.wechatprompt('图片大小已经超过2M，请重新上传小于2M的图片！');

      return false;
    } else {
      // this.img = this.sanitizer.bypassSecurityTrustUrl(event.files[0].objectURL.changingThisBreaksApplicationSecurity);
      if (this.selectPreview) {
        this.img = this.previewImg ? Config.imageDomain + this.previewImg : this.sanitizer.bypassSecurityTrustUrl(event.files[0].objectURL.changingThisBreaksApplicationSecurity);
      }
    }
  }

  onClosed() {
    this.img = '';
    this.imgEvent.emit(this.img);
  }
}
