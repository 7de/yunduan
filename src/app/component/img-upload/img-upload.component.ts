import {Component, EventEmitter, Output, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Cookie} from 'ng2-cookies';
import {FlashMessagesService} from '../../service/flash-messages.service';
import {Config} from '../../config/config';
import {DomSanitizer} from '@angular/platform-browser';
import {SetupHelper} from '../../common/helper/setup-helper';
import {LocalStorageService} from '../../service/local-storage.service';


@Component({
  selector: 'app-img-upload',
  templateUrl: './img-upload.component.html'
})
export class ImgUploadComponent implements OnChanges {
  @Input() previewImg: string;
  @Output() imgEvent = new EventEmitter();
  @Output() imgLengthEvent = new EventEmitter();

  result;
  params;
  api: string = Config.apiDomain;
  public url: string;
  chooseLabel: string;

  imgLength;
  imgSrc;
  public img: any;

  constructor(private flashMessages: FlashMessagesService, public sanitizer: DomSanitizer, private localStorage: LocalStorageService) {
    const type = this.localStorage.getObject('companyType');
    if (type === 0) {
      this.url = this.api + Config.mainApiVersion + '/file/upload-img?fileType=image';
    }
    if (type === 1) {
      this.url = this.api + Config.mainApiBusiness + '/upload?fileType=image';
    }
  }


  onBasicUpload(event) {
    let data = JSON.parse(event.xhr.response);
    if (data.code === 0) {
      this.imgSrc = data.data.filename;
      this.imgLength = event.files.length;
      this.imgEvent.emit(this.imgSrc);
      this.imgLengthEvent.emit(this.imgLength);
      this.chooseLabel = '修改图片';
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
    this.img = this.previewImg && SetupHelper.validateImage(this.previewImg) ? Config.imageDomain + this.previewImg : false;
    this.chooseLabel = this.previewImg ? '修改图片' : '上传图片';
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
      this.img = this.sanitizer.bypassSecurityTrustUrl(event.files[0].objectURL.changingThisBreaksApplicationSecurity);
    }
  }
}

