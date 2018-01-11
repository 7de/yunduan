import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PayService} from '#{service}/pay.service';
import {FlashMessagesService} from '#{service}/flash-messages.service';
import {HttpClientService} from '#{service}/http-client.service';
import {CompanyService} from '#{service}/company.service';
import {Config} from '#{config}/config';

@Component({
  selector: 'app-password-modify',
  templateUrl: './password-modify.component.html',
  styleUrls: ['./password-modify.component.scss']
})
export class PasswordModifyComponent implements OnInit {

  public form;
  companyInfo;
  constructor(private pay: PayService,
              public flashMessages: FlashMessagesService,
              public http: HttpClientService,
              public company: CompanyService) { }

  ngOnInit() {
    this.info();
    this.form = new FormGroup({
      current: new FormControl('', Validators.required),
      new_password: new FormControl('', Validators.required),
      repeat_password: new FormControl('', Validators.required),
    })
  }

  /**
   * 获取买家头像/昵称信息/钱包信息
   */
  public info() {
    this.http.version = Config.mainApiVersion;
    this.company.getCompany().subscribe(
      res => {
        this.companyInfo = res;
      }
    )
  }

  onSubmit(form) {
    if (!form.valid) {
      return false;
    }
    if (form.value.new_password !== form.value.repeat_password) {
      return this.flashMessages.wechatprompt('两次输入密码不一致，请重新输入')
    }

    this.pay.modifyPass({
      'pwd_pay': form.value.current,
      'pwd_pay_new': form.value.new_password
    }).subscribe(
      result => {
        this.flashMessages.wechatprompt('保存成功'); this.form.reset();
      }, err => {
        this.flashMessages.wechatprompt('错误提示：' + err)
      }
    )
  }

}
