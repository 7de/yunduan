import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Headers} from '@angular/http';
import {HttpClientService} from '../../../service/http-client.service';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {ValidatePassword, ValidatePhone, ValidDiaGram, ValidSMSCode} from '../../../common/shared/validator';
import {FlashMessagesService} from '../../../service/flash-messages.service';
import {Config} from '../../../config/config';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-forgot',
  templateUrl: './user-forgot.component.html',
  styleUrls: ['./user-forgot.component.scss']
})
export class UserForgotComponent implements OnInit {
  repeat_password: any;
  password: any;
  subscription: Subscription;
  forgotForm: FormGroup;
  checkForm: FormGroup;
  sendCodeButton = '获取验证码';
  sendCodeTime: number;
  sendCodeDisabled = false;

  checkCodeUrl = '/company-account/verify-phone-code';
  resetPassUrl = '/business/common-reset-pass';
  sendCodeUrl = '/business/common-reset-code';

  apiDomain: string = Config.apiDomain;

  public sendCaptchaUrl;

  forgotFormHidden = true;
  completeHidden = true;
  checkFormHidden = false;

  phone: number;
  code: string;

  constructor(private http: HttpClientService,
              private fb: FormBuilder,
              private router: Router,
              private flashMessages: FlashMessagesService) {
    this.checkForm = new FormGroup({
      phone: new FormControl('', [ValidatePhone]), // 表单初始值
      code: new FormControl('', [ValidSMSCode]), // 表单初始值
      captchacode: new FormControl('', [ValidDiaGram]),
    });
    this.forgotForm = fb.group({
      password: ['', [ValidatePassword]],
      repeat_password: [''],
    }, {validator: this.matchingPasswords('password', 'repeat_password')});
  }

  ngOnInit() {
    this.sendCaptchacode();
  }

  /**
   * 图形验证码
   */
  sendCaptchacode() {
    this.sendCaptchaUrl = this.apiDomain + 'v1/captcha?t=' + Math.random() + '';
  }

  /*
  *  跳转到第三方服务商的时高亮
  * */
  orderEven() {
    this.router.navigate(['/shop'], {
      queryParams: {demand_category_id: '1'}
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
   * 发送验证码请求
   * @param form
   * @returns {any}
   */
  sendCode(form) {
    if (this.sendCodeDisabled) {
      return false;
    }
    const params = {phone: form.phone, captcha: form.captchacode};
    return this.httpPost(this.sendCodeUrl, params, Config.mainApiBusiness).subscribe(
      () => this.sendCodeTimer(),
      err => {
        this.sendCaptchacode();
        this.flashMessages.wechatprompt(err);
      });

    // if (this.companyType === '1') {
    //   const params = {phone: form.phone, captcha: form.captchacode, code_type: 2, user_type: 1};
    //   return this.httpPost(this.sendCodeUrl, params).subscribe(
    //     () => this.sendCodeTimer(),
    //     err => {
    //       this.flashMessages.wechatprompt(err);
    //     });
    // } else {
    //   const params = {phone: form.phone, captcha: form.captchacode, code_type: 2, user_type: 2};
    //   return this.httpPost(this.sendCodeUrl, params).subscribe(
    //     () => this.sendCodeTimer(),
    //     err => {
    //       this.flashMessages.wechatprompt(err);
    //     });
    // }
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
   * 验证“短信验证码”
   * @param form
   * @returns {Subscription}
   */
  checkCode(form) {
    if (!form.valid) {
      return false;
    }
    const formValue = form.value;
    const params = {phone: formValue.phone, code: formValue.code, code_type: 2};
    return this.httpPost(this.checkCodeUrl, params, Config.mainApiVersion).subscribe(
      () => {
        this.phone = params.phone;
        this.code = params.code;
        this.checkFormHidden = true;
        this.forgotFormHidden = false;
      }, error => this.flashMessages.wechatprompt(error));
  }


  /**
   * 重置密码
   * @param form
   * @returns {Subscription}
   */
  resetPassword(form) {
    if (!form.valid) {
      return false;
    }
    const formValue = form.value;
    const params = {phone: this.phone, code: this.code, new_pass: formValue.password};
    // if (this.companyType === '0') {
    // this.http.version = Config.mainApiVersion;
    return this.httpPost(this.resetPassUrl, params, Config.mainApiBusiness).subscribe(
      () => {
        this.forgotFormHidden = true;
        this.completeHidden = false;
      }, error => {
        this.flashMessages.wechatprompt(error);
        this.sendCaptchacode();
      });
    // } else {
    //   return this.httpPost(this.serviceResetUrl, params, Config.mainApiBusiness).subscribe(
    //     () => {
    //       this.forgotFormHidden = true;
    //       this.completeHidden = false;
    //     }, error => {
    //       this.flashMessages.wechatprompt(error);
    //       this.sendCaptchacode();
    //     });
    // }
  }

  /**
   * 不带验证的请求
   * @param url
   * @param params
   * @returns {Observable<any>}
   */
  httpPost(url, params, version) {
    const headers = new Headers();
    this.http.version = version;
    return this.http.post(url, params, {headers: headers, withCredentials: true});
  }
}
