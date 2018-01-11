import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {FlashMessagesService} from '#{service}/flash-messages.service';
import {BusinessService} from '#{service}/business.service';
import {PayService} from '#{service}/pay.service';
import {LocalStorageService} from '#{service}/local-storage.service';
import {ValidSMSCode} from '#{common}/shared/validator';

@Component({
  selector: 'app-seller-password-reset',
  templateUrl: './seller-password-reset.component.html',
  styleUrls: ['./seller-password-reset.component.scss']
})
export class SellerPasswordResetComponent implements OnInit {

  data;
  form;
  sendCodeButton = '获取验证码';
  sendCodeTime;
  sendCodeDisabled = false;
  subscription: Subscription;
  phone = this.localStorage.get('phone');
  loginInfo = this.localStorage.getObject('serviceCompany');
  sellerInfo;


  constructor(
    private flashMessages: FlashMessagesService,
    private fb: FormBuilder,
    private business: BusinessService,
    private pay: PayService,
    private localStorage: LocalStorageService) {
    this.form = fb.group({
      code: ['', ValidSMSCode],
      password: ['', [Validators.required]],
      repeat_password: ['', Validators.required],
    }, {validator: this.matchingPasswords('password', 'repeat_password')});
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.getSellerInfo();
  }

  /*
  * 保存-数据提交
  * */
  onSubmit(form) {
    if (!form.valid) {
      return false;
    }
    this.pay.sellerResetPass({
      pwd_pay_new: form.value.password,
      verify_code: form.value.code
    }).subscribe(result => {
      this.flashMessages.wechatprompt('保存成功');
      this.form.reset();
      this.sendCodeButton = '获取验证码';
      this.subscription.unsubscribe(); // 取消订阅
      },
      err => this.flashMessages.wechatprompt('错误提示：' + err))
  }

  /*
  * 获取验证码
  * */
  getSms() {
    this.business.getPaymentSms().subscribe(
      () => this.sendCodeTimer(),
      err => {
        this.flashMessages.wechatprompt(err);
      });
  }

  /**
   * 倒计时
   */
  sendCodeTimer() {
    this.sendCodeTime = 60;
    let timer = Observable.timer(this.sendCodeTime, 1000);
    this.subscription = timer.subscribe(() => {
      if (this.sendCodeTime) {
        this.sendCodeTime--;
        this.sendCodeDisabled = true;
        this.sendCodeButton = this.sendCodeTime + '秒';
      } else {
        this.sendCodeDisabled = false;
        this.sendCodeButton = '获取验证码';
        this.subscription.unsubscribe(); // 取消订阅
      }
    });
  }

  /**
   * 密码重复验证
   * @param {string} passwordKey
   * @param {string} passwordConfirmationKey
   * @returns {(group: FormGroup) => void}
   */
  matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey];
      let passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true})
      }
    }
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
