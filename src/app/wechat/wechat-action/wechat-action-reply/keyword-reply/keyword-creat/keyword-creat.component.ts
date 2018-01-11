import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClientService} from '../../../../../service/http-client.service';
import {WechatComponent} from '../../../../../common/base/wechat-component';
import {FormControl, FormGroup} from '@angular/forms';
import {FlashMessagesService} from '../../../../../service/flash-messages.service';
import {SetupHelper} from '../../../../../common/helper/setup-helper';
import {ValidDetails} from '../../../../../common/shared/validator';

@Component({
  selector: 'app-keyword-creat',
  templateUrl: './keyword-creat.component.html',
  styleUrls: ['./keyword-creat.component.scss']
})
export class KeywordCreatComponent extends WechatComponent implements OnInit {

  private Url = '/keyword-msgs';
  errors;
  errorsAdd;
  public params;
  public paramsKey;
  public dataKey;
  keywordId = this.route.snapshot.params['id'];

  keywords: string[];

  imgSrc;
  imgLength;


  // 表单参数
  formModel: FormGroup;
  formDataModel: FormGroup;

  constructor(protected http: HttpClientService, private route: ActivatedRoute, private router: Router, private flashMessages: FlashMessagesService) {
    super(http);
  }

  ngOnInit() {
    this.formModel = new FormGroup({
      group_name: new FormControl('', [ValidDetails]),
      keyword: new FormControl('', [ValidDetails]),
      msg_type: new FormControl('2'),
      msg_content: new FormControl('', [ValidDetails])
    });
    this.formDataModel = new FormGroup({
      group_name: new FormControl('', [ValidDetails]),
      keyword: new FormControl('', [ValidDetails]),
      msg_type: new FormControl('2'),
      msg_content: new FormControl('')
    });

    if (this.keywordId === ':id') {
      this.keywordId = '';
    } else {
      this.keywordId = this.route.snapshot.params['id'];
      this.route
        .queryParams
        .subscribe(params => {
          this.params = {};
          this.keywordData();
        });
    }
  }

  // 添加关键词
  onSubmit(form) {
    if (form.value.msg_type === 3 && !SetupHelper.validateImage(form.value.msg_content)) {
      this.errorsAdd = '请上传图片';
    } else {
      this.errorsAdd = '请添加内容';
    }
    if (form.valid) {
      this.postData();
    }
  }

  // 修改关键词
  onSubmitData(form) {
    form.controls['msg_type'].setValue(this.dataKey.message.msg_type);
    if (form.valid) {
      if (form.value.msg_type === 3) {
        if (!SetupHelper.validateImage(form.value.msg_content)) {
          this.errors = '请上传图片';
        } else {
          this.errors = '';
          this.modifyData();
        }
      }
      if (form.value.msg_type === 2) {
        if (!form.value.msg_content) {
          this.errors = '请添加内容';
        } else {
          this.errors = '';
          this.modifyData();
        }
      }
    }
  }

  // 数据提交
  postData() {
    this.http.post(this.Url, this.formModel.value).subscribe(
      result => {
        if (result) {
          this.flashMessages.wechatsuc('添加成功！');
          this.router.navigate(['wechat/wechat-action/reply/reply-index/keyword']);
        }
      },
      err => {
        this.flashMessages.wechaterr('添加失败！' + err);
      });
  }

  // 修改关键词
  modifyData() {
    return this.http.put(this.Url + '/' + this.keywordId, this.formDataModel.value).subscribe(
      result => {
        if (result) {
          this.flashMessages.wechatsuc('修改成功！');
          this.router.navigate(['wechat/wechat-action/reply/reply-index/keyword']);
        }
      },
      err => {
        this.flashMessages.wechaterr('修改失败！' + err);
      }
    );
  }

  // 获取指定关键词
  keywordData() {
    const params = Object.assign({expand: 'message,keywords'}, this.paramsKey);
    return this.http.get(this.Url + '/' + this.keywordId, params).subscribe(
      result => {
        this.dataKey = result;
        this.keywords = this.dataKey.keywords;
      });
  }

  // 单选
  radioChange(event) {
    if (event.target.checked) {
      this.dataKey.message.msg_type = Number(event.target.defaultValue);
    }
  }

  imgMethod(event) {
    this.imgSrc = event;
    if (this.dataKey) {
      this.dataKey.message.msg_content = event;
    }
  }

  // 返回已上传图片长度
  imgLengthMethod(event) {
    this.imgLength = event;
  }

}
