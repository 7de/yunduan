import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LocalStorageService} from '#{service}/local-storage.service';
import {PayService} from '#{service}/pay.service';
import {CompanyService} from '#{service}/company.service';
import {FlashMessagesService} from '#{service}/flash-messages.service';
import {ValidateNum2} from '#{common}/shared/validator';

@Component({
  selector: 'app-account-cash',
  templateUrl: './account-cash.component.html',
  styleUrls: ['../../../../../seller/personal/seller-set/seller-account/seller-cash/seller-cash.component.scss']
})
export class AccountCashComponent implements OnInit {

  companyType = this.localStorage.get('companyType');
  users;
  form;
  buyerInfo;
  errMessage;
  tips = false;
  constructor(public localStorage: LocalStorageService,
              private pay: PayService,
              public company: CompanyService,
              public flashMessages: FlashMessagesService,
              public router: Router) { }

  ngOnInit() {
    if (this.companyType === '0') {
      this.users = 'buyer';
    }else if (this.companyType === '1') {
      this.users = 'seller'
    }
    this.form = new FormGroup({
      cashMoney: new FormControl('', [ValidateNum2]),
      timely: new FormControl('1',  [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    this.getBuyerInfo();
  }

  onSubmit(form) {
    if (!form.valid) {
      return false;
    }
    if (form.value.cashMoney > this.buyerInfo['wallet']['balance']) {
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
    this.pay.buyerCash(params).subscribe(
      res => {
        this.router.navigate(['/buyer/cashSuc'], { queryParams: {'money': params.money}})
      }, err => {
        this.errMessage = err;
      }
    )
  }

  getBuyerInfo() {
    this.company.getCompany().subscribe(
      res => {
        this.buyerInfo = res;
      }
    )
  }

  onKeyUp(event) {
    if (event.target.value > this.buyerInfo['wallet']['balance'] / 100) {
      this.tips = true;
    } else {
      this.tips = false;
    }
  }

}
