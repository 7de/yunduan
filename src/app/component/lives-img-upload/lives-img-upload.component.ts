import {Component, OnInit, Input, OnChanges, Output, EventEmitter, ViewChild} from '@angular/core';
import {Config} from '../../config/config';
import {HttpClientService} from '../../service/http-client.service';
import {FlashMessagesService} from '../../service/flash-messages.service';

@Component({
  selector: 'app-lives-img-upload',
  templateUrl: './lives-img-upload.component.html',
  styleUrls: ['./lives-img-upload.component.scss']
})
export class LivesImgUploadComponent implements OnInit, OnChanges {
  errors: string;

  @ViewChild('myInput') myInputVariable: any;

  public imgSrc;
  private uploadFileUrl = '/file/upload-img?fileType=image';
  public hoverBool:boolean;

  @Output() result = new EventEmitter();
  @Input() previewImg;
  @Input() clearImg;


  constructor(private http: HttpClientService,
              private flashMessages: FlashMessagesService) {
  }

  ngOnInit() {
    if (this.clearImg) {
      this.deleteImg();
    }
  }

  ngOnChanges() {
    this.imgSrc = this.previewImg;
  }

  /**
   * 上传图片
   * @param event
   */
  uploadFile(event) {
    this.errors = '';
    const fileList: FileList = event.target.files;
    if (fileList.length) {
      const file: File = fileList[0];
      if (file.size > 1024 * 1024 * 2) {
        this.errors = '图片大小不超过2M';
        return false;
      }
      this.http.version = Config.mainApiVersion;
      this.http.uploadFile(this.uploadFileUrl, file).subscribe(
        result => {
          this.imgSrc = result['filename'];
          this.result.emit(result);
        },
        error => {
          this.flashMessages.wechatprompt('文件太大或格式不符合');
        });
    }
  }

  /**
   * 删除图片
   */
  deleteImg() {
    this.myInputVariable.nativeElement.value = '';
    this.imgSrc = '';
    this.result.emit('');
  }
}
