import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PayService} from '#{service}/pay.service';
import {FlashMessagesService} from '#{service}/flash-messages.service';
import {LocalStorageService} from '#{service}/local-storage.service';
import {BusinessService} from '#{service}/business.service';

@Component({
  selector: 'app-seller-password-modify',
  templateUrl: './seller-password-modify.component.html',
  styleUrls: ['./seller-password-modify.component.scss']
})
export class SellerPasswordModifyComponent implements OnInit {

  public form;
  sellerInfo;
  constructor(
    private pay: PayService,
    public flashMessages: FlashMessagesService,
    public localStorage: LocalStorageService,
    private business: BusinessService) { }

  ngOnInit() {
    this.form = new FormGroup({
      current: new FormControl('', Validators.required),
      new_password: new FormControl('', Validators.required),
      repeat_password: new FormControl('', Validators.required),
    })
    this.getSellerInfo();
  }

  onSubmit(form) {
    if (!form.valid) {
      return false;
    }
    if (form.value.new_password !== form.value.repeat_password) {
      return this.flashMessages.wechatprompt('两次输入密码不一致，请重新输入')
    }

    this.pay.sellerModifyPass({
      'pwd_pay': form.value.current,
      'pwd_pay_new': form.value.new_password
    }).subscribe(
      result => {
        this.flashMessages.wechatprompt('保存成功');
        this.form.reset()
      }, err => {
        this.flashMessages.wechatprompt('错误提示：' + err)
      }
    )
  }

  /**
   * 获取当前服务商信息
   */
  getSellerInfo() {
    const params = {'expand': 'shop,profile,demands,wallet'};
    this.business.getBusiness(params).subscribe(
      res => {
        this.sellerInfo = res;
      }
    )
  }

}
