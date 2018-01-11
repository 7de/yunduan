import {Component, OnInit} from '@angular/core';
import {ValidSMSCode} from '../../../../common/shared/validator';
import {FlashMessagesService} from '../../../../service/flash-messages.service';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {BusinessService} from '../../../../service/business.service';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {LocalStorageService} from '../../../../service/local-storage.service';
import 'rxjs/add/observable/timer';


@Component({
  selector: 'app-seller-set',
  templateUrl: './seller-set.component.html',
  styleUrls: ['./seller-set.component.scss']
})
export class SellerSetComponent implements OnInit {
  data;
  form;
  sendCodeButton = '获取验证码';
  sendCodeTime;
  sendCodeDisabled = false;
  subscription: Subscription;
  phone = this.localStorage.get('phone');


  constructor(private flashMessages: FlashMessagesService, private fb: FormBuilder, private business: BusinessService, private localStorage: LocalStorageService) {
    this.form = fb.group({
      code: ['', ValidSMSCode],
      password: ['', [Validators.required]],
      repeat_password: ['', Validators.required],
    }, {validator: this.matchingPasswords('password', 'repeat_password')});
  }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  /*
  * 保存-数据提交
  * */
  onSubmit(form) {
    if (!form.valid) {
      return false;
    }
    this.business.postPayment({
      pwd_pay_new: form.value.password,
      verify_code: form.value.code
    }).subscribe(result => this.flashMessages.wechatprompt('保存成功'),
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

}
