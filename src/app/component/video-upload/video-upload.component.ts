import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Cookie } from 'ng2-cookies';

import { SetupHelper } from '../../common/helper/setup-helper';
import { Config } from '../../config/config';
import { FlashMessagesService } from '../../service/flash-messages.service';
import { LocalStorageService } from '../../service/local-storage.service';


@Component({
  selector: 'app-video-upload',
  templateUrl: './video-upload.component.html',
  styleUrls: ['./video-upload.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VideoUploadComponent implements OnChanges {
  errors: string;

  @Output() imgEvent = new EventEmitter();
  @Output() imgLengthEvent = new EventEmitter();
  @Output() imgProgress = new EventEmitter(); // 上传进度
  @Output() result = new EventEmitter();

  params;
  api: string = Config.apiDomain;
  public url: string;
  chooseLabel = '视频上传';

  imgLength;
  imgSrc;
  public img: any;
  _disable;

  uploadedFiles: any;

  constructor(private flashMessages: FlashMessagesService, public sanitizer: DomSanitizer, private localStorage: LocalStorageService) {
    const type = this.localStorage.getObject('companyType');
    if (type === 0) {
      this.url = this.api + Config.mainApiVersion + '/file/upload-img?fileType=video';
    }
    if (type === 1) {
      this.url = this.api + Config.mainApiBusiness + '/upload?fileType=video';
    }
  }


  onBasicUpload(event) {
    let result = JSON.parse(event.xhr.response);
    const { code, data } = result
    if (code === 0) {
      this.result.emit(data);
    } else {
      this.flashMessages.wechaterr('请重新上传');
    }
  }

  /**
   * 解决 previewImg 参数不更新
   * @param {SimpleChanges} changes
   */
  ngOnChanges(changes: SimpleChanges) {
  }


  onBeforeSend(event) {
    event.xhr.setRequestHeader('Authorization', Cookie.get('currentCompanyAuthorization'));
  }

  onSelect(event) {
    this.removeUploadFile()
    let file = event.files[0];
    if (event.files.length) {
      if (file.size > 1024 * 1024 * 100) {
        this.errors = '视频上传最大为100M';
        return false;
      }
      if (!SetupHelper.validateVideo(file.name)) {
        this.errors = '不支持此格式，目前只支持MP4格式';
        return false;
      }
      this.uploadedFiles.push({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2),
        progress: 0,
        style: undefined,
      });
      this._disable = true;
    }
  }

  // 获取进度条
  onProgress(event) {
    Object.assign(this.uploadedFiles[0], {
      progress: event.progress,
      style: { width: event.progress + '%' }
    });
    this.imgProgress.emit(event.progress);
  }

  // 获取上传文件信息
  onBeforeUpload(event) {
  }

  removeUploadFile() {
    this.errors = '';
    this.uploadedFiles = [];
    this.result.emit('');
    this._disable = false;
  }
}
