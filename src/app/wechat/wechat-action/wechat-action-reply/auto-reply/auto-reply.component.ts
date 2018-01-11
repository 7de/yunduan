import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, Params} from '@angular/router';
import {HttpClientService} from '../../../../service/http-client.service';
import {WechatComponent} from '../../../../common/base/wechat-component';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LocalStorageService} from '../../../../service/local-storage.service';
import {FlashMessagesService} from '../../../../service/flash-messages.service';
import {SetupHelper} from '../../../../common/helper/setup-helper';

@Component({
  selector: 'app-auto-reply',
  templateUrl: './auto-reply.component.html',
  styleUrls: ['./auto-reply.component.scss']
})
export class AutoReplyComponent extends WechatComponent implements OnInit {

  localData = this.localStorage.getObject('currentCompany');
  replyData;
  errors;
  imgSrc;
  imgLength;
  pageErr: boolean = false; // 未授权

  // 获取配置变量
  // private getUrl = '/default-msgs/' + this.localData.id;
  public params;
  public data;

  private dataUrl = '/default-msgs';

  // 表单变量
  formModel: FormGroup;

  constructor(private localStorage: LocalStorageService, private route: ActivatedRoute, private router: Router, protected http: HttpClientService, private flashMessages: FlashMessagesService) {
    super(http);
  }

  ngOnInit() {
    this.init();
    this.formModel = new FormGroup({
      msg_type: new FormControl(2),
      msg_content: new FormControl('')
    });
  }

  // 页面初始化
  init() {
    this.getData();
  }

  // 获取关注自动回复的配置
  getData() {
    return this.http.get(this.dataUrl + '/' + this.localData.id).subscribe(
      result => {
        this.replyData = result;
        let type = this.replyData.msg_type;
        let content = this.replyData.msg_content;
        if (!this.replyData.msg_type) {
          this.replyData.msg_type = 2;
          return false
        }
        this.formModel.controls['msg_type'].setValue(type);
        this.formModel.controls['msg_content'].setValue(content);
      },error => {
      if (error === '公众号未授权') {
        this.pageErr = true;
        this.replyData = ({
          'msg_type': 2
        })
      }
    });
  }

  // 设置关注自动回复数据
  setData() {
    return this.http.post(this.dataUrl, this.formModel.value).subscribe(
      result => {
        if (result) {
          this.flashMessages.wechatsuc('保存成功！');
          this.router.navigate(['wechat/wechat-action/reply/reply-index/info']);
        }
      }, err => {
        this.flashMessages.wechaterr('修改失败！' + err);
      }
    )
  }

  // 保存关注自动回复
  onSubmit(form) {
    //;(form.value.msg_type);
    this.errors = {};
    if (this.replyData.msg_type === 3) {
      if (!SetupHelper.validateImage(form.value.msg_content)) {
        this.errors = '请上传图片';
      } else {
        this.errors = '';
        this.setData();
      }
    } else {
      if (!form.value.msg_content) {
        this.errors = '请添加内容';
      } else {
        this.errors = '';
        this.setData();
      }
    }
  }

  // 单选
  radioChange(event) {
    if (event.target.checked) {
      this.replyData.msg_type = Number(event.target.defaultValue);
    }
  }

  // 上传图片返回值
  imgMethod(event) {
    this.formModel.controls['msg_content'].setValue(event);
  }

}
