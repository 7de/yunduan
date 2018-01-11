import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {FlashMessagesService} from '#{service}/flash-messages.service';
import {PayService} from '#{service}/pay.service';
import {LocalStorageService} from '#{service}/local-storage.service';
import {HttpClientService} from '#{service}/http-client.service';
import {CompanyService} from '#{service}/company.service';
import {ValidSMSCode} from '#{common}/shared/validator';
import {Config} from '#{config}/config';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['../../../../../seller/personal/seller-set/seller-account/seller-password-reset/seller-password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  companyInfo;
  form;
  sendCodeButton = '获取验证码';
  sendCodeTime;
  sendCodeDisabled = false;
  subscription: Subscription;
  phone = this.localStorage.get('phone');

  constructor(private flashMessages: FlashMessagesService,
              private fb: FormBuilder,
              private pay: PayService,
              private localStorage: LocalStorageService,
              public http: HttpClientService,
              public company: CompanyService) {
    this.form = fb.group({
      code: ['', ValidSMSCode],
      password: ['', [Validators.required]],
      repeat_password: ['', Validators.required],
    }, {validator: this.matchingPasswords('password', 'repeat_password')});
  }

  ngOnInit() {
    this.info();
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

  /*
  * 保存-数据提交
  * */
  onSubmit(form) {
    if (!form.valid) {
      return false;
    }
    this.pay.resetPass({
      pwd_pay_new: form.value.password,
      verify_code: form.value.code
    }).subscribe(
      result => {
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
    this.pay.fundSendCode({}, 2).subscribe(
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

}
