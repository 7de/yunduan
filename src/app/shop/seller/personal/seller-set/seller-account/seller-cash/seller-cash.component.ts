import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LocalStorageService} from '#{service}/local-storage.service';
import {PayService} from '#{service}/pay.service';
import {FlashMessagesService} from '#{service}/flash-messages.service';
import {BusinessService} from '#{service}/business.service';
import {ValidateNum2} from '#{common}/shared/validator';

@Component({
  selector: 'app-seller-cash',
  templateUrl: './seller-cash.component.html',
  styleUrls: ['./seller-cash.component.scss']
})
export class SellerCashComponent implements OnInit {

  users;
  form;
  errMessage;
  tips = false;
  companyType = this.localStorage.get('companyType');
  sellerInfo;
  constructor(public localStorage: LocalStorageService,
              private pay: PayService,
              public flashMessages: FlashMessagesService,
              public router: Router,
              private business: BusinessService) { }

  ngOnInit() {
    if (this.companyType === '0') {
      this.users = 'buyer';
    }else if (this.companyType === '1') {
      this.users = 'seller'
    }
    this.getSellerInfo();
    this.form = new FormGroup({
      cashMoney: new FormControl('', [ValidateNum2]),
      timely: new FormControl('1',  [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit(form) {
    if (!form.valid) {
      return false;
    }
    if (form.value.cashMoney > this.sellerInfo['wallet']['balance']) {
      return this.flashMessages.wechatprompt('超过可提现金额数！请重新输入提现金额')
    } else if (form.value.cashMoney < 5000) {
      return this.flashMessages.wechatprompt('低于最低提现金额数！请重新输入提现金额')
    } else if (form.value.cashMoney > 1000000) {
      return this.flashMessages.wechatprompt('单笔提现金额超过100万！请重新输入提现金额')
    }
    const params = Object.assign({
      'money': form.value.cashMoney,
      'pwd_pay': form.value.password,
    })
    this.pay.sellerCash(params).subscribe(
      res => {
        this.router.navigate(['/seller/cashSuc'], { queryParams: {'money': params.money}})
      }, err => {
        this.errMessage = err;
      }
    )
  }

  onKeyUp(event) {
    if (event.target.value > this.sellerInfo['wallet']['balance'] / 100) {
      this.tips = true;
    } else {
      this.tips = false;
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
