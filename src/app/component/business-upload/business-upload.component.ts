import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FlashMessagesService} from '#{service}/flash-messages.service';
import {HttpClientService} from '#{service}/http-client.service';
import {Config} from '#{config}/config';

@Component({
  selector: 'app-business-upload',
  templateUrl: './business-upload.component.html',
  styleUrls: ['./business-upload.component.scss']
})
export class BusinessUploadComponent implements OnInit {
  @ViewChild('myInput') myInputVariable: any;

  @Input() fileAry; // 上传文件组
  @Input() fileId; // 上传文件Id
  @Input() url; // 上传文件Url 允许上传类型
  @Input() type; // 区分基金/服务商  --默认服务商（false）
  @Input() fileType; //文件类型 默认附件-1，图片-2
  @Input() fileNum;  //文件数量 默认数量5
  @Output() processEvent = new EventEmitter();

  constructor(private flashMessages: FlashMessagesService, private http: HttpClientService) {
  }

  ngOnInit() {
    this.fileNum = this.fileNum ? this.fileNum : 5;
  }

  /**
   * 上传文件
   */
  uploadFile(event) {
    const fileList: FileList = event.target.files;
    let processValue = Math.floor(Math.random() * 10) + 1;
    if(!this.fileType||this.fileType===1){
      this.fileAry.push({
        file: event.target.files[0],
        process: processValue
      });
      let len = this.fileAry.length;
      this.processEvent.emit(this.fileAry[len - 1]['process']);
    }
    let len = this.fileAry.length;
    if (fileList.length > 0 && len < (this.fileNum + 1)) {
      const file: File = fileList[0];
      if (this.type) {
        this.http.version = Config.mainApiVersion;
      } else {
        this.http.version = Config.mainApiBusiness;
      }
      this.http.uploadFile(this.url, file).subscribe(
        result => {
          this.fileId.push(result['id']);
          if(this.fileType===2){
            this.fileAry.push(result['filename']);
          }else {
            this.fileAry[len - 1]['process'] = 100;
            this.processEvent.emit(this.fileAry[len - 1]['process']);
          }
        },
        err => {
          if(!this.fileType||this.fileType===1){
            this.fileAry[len - 1]['process'] = 100;
            this.processEvent.emit(this.fileAry[len - 1]['process']);
            this.fileAry.splice(this.fileAry.length - 1, 1);
          }
          this.flashMessages.wechatprompt('失败：' + err);
        });
    } else {
      if(!this.fileType||this.fileType===1){
        this.fileAry[len - 1]['process'] = 100;
        this.processEvent.emit(this.fileAry[len - 1]['process']);
      }
      this.fileAry.splice(this.fileAry.length - 1, 1);
      this.flashMessages.wechatprompt('最多只能选择'+ this.fileNum +'个文件');
    }
  }

  /**
   * 删除文件
   */
  deleteFile(idx) {
    if(!this.fileType||this.fileType===1){
      this.fileAry[idx]['process'] = 100;
      this.processEvent.emit(this.fileAry[idx]['process']);
    }
    this.myInputVariable.nativeElement.value = '';
    this.fileAry.splice(idx, 1);
    this.fileId.splice(idx, 1);
  }

  /**
   * 文件大小换算
   * @param num
   * @returns {string}
   */
  fileSize(num) {
    if (num > 1048576) {
      return Number((num / 1024) / 1024).toFixed(2) + 'M'
    } else {
      return Number(num / 1024).toFixed(2) + 'KB'
    }
  }

}
