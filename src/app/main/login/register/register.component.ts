import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Headers } from '@angular/http';
import { HttpClientService } from '#{service}/http-client.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Cookie } from 'ng2-cookies';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {
  ValidatePassword,
  ValidatePhone,
  ValidDiaGram,
  ValidOldPassword,
  ValidSMSCode,
  ValidSelect,
  ValidEmail,
  ValidIsEmpty
} from '#{common}/shared/validator';
import { FlashMessagesService } from '#{service}/flash-messages.service';
import { Router } from '@angular/router';
import { Config } from '#{config}/config';
import { CompanyService } from '#{service}/company.service';
import { LocalStorageService } from 'app/service/local-storage.service';
import { BusinessService } from '#{service}/business.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit, OnDestroy {
  public apiDomain: string = Config.apiDomain;
  public checkForm: FormGroup;
  public subscription: Subscription;
  public sendCodeButton = '获取验证码';
  public sendCodeTime: number;
  public sendCodeDisabled = false;

  public timer;

  public cn: object = Config.calendarLocaleCN;

  public sendCaptchaUrl;

  public fundIsSelected = true;
  public companyIsSelected = false;

  public companyType = '0';
  public registerStatus = false;

  public fundRegisterUrl = '/company-account/register'; // 服务商会员注册
  public companyRegisterUrl = '/business'; // 企业会员注册

  public uploadFile
  public uploadImg

  constructor(
    private router: Router,
    private http: HttpClientService,
    private fb: FormBuilder,
    private flashMessages: FlashMessagesService,
    private route: Router,
    private companyService: CompanyService,
    private localStorage: LocalStorageService,
    private business: BusinessService,
    public sanitizer: DomSanitizer
  ) {
    this.checkForm = fb.group({
      phone: ['', [ValidatePhone]],
      captchacode: ['', [ValidDiaGram]],
      code: ['', [ValidSMSCode]],
      password: ['', [ValidatePassword]],
      agreed: [true, [Validators.requiredTrue]],
      company_name: ['', []],
      name_short: ['', []],
      linkman: ['', []],
      email: ['', []],
      manage_type: ['', []]
    })
  }

  ngOnInit() {
    if (Cookie.check('currentCompanyAuthorization')) {
      this.registerStatus = true
      this.companyType = this.localStorage.get('companyType')
    } else {
      this.sendCaptchacode()
    }
  }

  /**
   * 销毁组件时清除定时器
   */
  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  /**
   * 图形验证码
   */
  sendCaptchacode() {
    this.sendCaptchaUrl = this.apiDomain + 'v1/captcha?t=' + Math.random() + '';
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
    const formValue = form.value;
    if (!formValue.captchacode) {
      this.flashMessages.wechatprompt('请输入图形验证码');
      return false;
    }
    const params = {
      phone: formValue.phone,
      captcha: formValue.captchacode,
      code_type: 1
    }

    const headers = new Headers();
    this.http.version = Config.mainApiVersion;
    this.http.post(
      '/company-account/send-phone-code',
      params,
      { headers: headers, withCredentials: true }
    ).subscribe(
      next => this.sendCodeTimer(),
      error => {
        this.flashMessages.wechatprompt(error);
        this.sendCaptchacode();
      }
      );
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
        return passwordConfirmationInput.setErrors({ notEquivalent: true })
      }
    }
  }

  /**
   * 新用户注册
   * @param form
   * @returns {Subscription}
   */
  resetPassword(form) {
    if (form.get('agreed').invalid) {
      this.flashMessages.wechatprompt('您还未接受云端•私募荟注册协议');
      return false;
    }

    if (form.invalid) {
      return false;
    }

    let url = null, formData = null
    if (this.companyType === '1') {
      url = this.fundRegisterUrl
      formData = form.value
    } else {
      url = this.companyRegisterUrl
      formData = {
        account_mobile: form.value['phone'],
        password: form.value['password'],
        code: form.value['code']
      }
    }

    this.httpPost(url, formData).subscribe(
      result => {
        if (result) {
          this.flashMessages.wechatprompt('注册成功！');
          this.timer = setInterval(() => {
            this.userLogin(form);
          }, 500);
        }
      },
      error => this.flashMessages.wechatprompt(error)
    );
  }

  /**
   * 注册完后直接登入
   */
  userLogin(form) {
    // console.log('登录中')
    const formValue = form.value;
    const headers = new Headers();
    const authorization = 'Basic ' + btoa(formValue.phone + ':' + formValue.password);
    headers.append('Accept', 'application/json');

    this.companyService.login(headers, {
      'username': formValue.phone,
      'password': btoa(formValue.password)
    }).subscribe(
      result => {
        this.companyType = result['type'];
        this.localStorage.set('companyType', result['type']);
        this.localStorage.set('phone', formValue.phone);
        Cookie.set('currentCompanyAuthorization', authorization, null, '/');
        if (result['type'] === 0) {
          this.registerStatus = true;
          this.localStorage.setObject('currentCompany', result['account']);
        } else if (result['type'] === 1) {
          const params = { 'expand': 'shop,profile,demands' };
          this.business.getBusiness(params).subscribe(
            res => {
              this.registerStatus = true;
              this.localStorage.setObject('serviceCompany', res);
            }
          )
        }
      });
  }

  /**
   * 不带验证的请求
   * @param url
   * @param params
   * @returns {Observable<any>}
   */
  httpPost(url, params) {
    const headers = new Headers();
    this.http.version = this.companyType === '1' ? Config.mainApiVersion : Config.mainApiBusiness;
    return this.http.post(url, params, { headers: headers, withCredentials: true });
  }

  httpGet(url, params) {
    const headers = new Headers();
    this.http.version = Config.mainApiVersion;
    return this.http.get(url, params, { headers: headers, withCredentials: true });
  }

  /**
   *  选择公司类型
   */
  companyChange(e) {
    const { value } = e.target
    this.fundIsSelected = !this.fundIsSelected
    this.companyIsSelected = !this.companyIsSelected
    this.companyType = value

    if (value == 1) {
      this.checkForm.get('company_name').setValidators([Validators.required, Validators.max(21)])
      this.checkForm.get('name_short').setValidators(Validators.required)
      this.checkForm.get('linkman').setValidators(Validators.required)
      this.checkForm.get('email').setValidators([ValidIsEmpty, ValidEmail])
      this.checkForm.get('manage_type').setValidators(ValidSelect)
    } else {
      this.checkForm.get('company_name').clearValidators()
      this.checkForm.get('name_short').clearValidators()
      this.checkForm.get('linkman').clearValidators()
      this.checkForm.get('email').clearValidators()
      this.checkForm.get('manage_type').clearValidators()
    }
  }

  onSelect(event) {
    this.uploadFile = event.files[0]
    this.uploadImg = this.sanitizer.bypassSecurityTrustUrl(event.files[0].objectURL.changingThisBreaksApplicationSecurity);
  }

  removeUpladFile() {
    this.uploadFile = ''
  }
}
