import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '#{service}/order.service';
import {CompanyService} from '#{service}/company.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PayService} from '#{service}/pay.service';
import {ValidBlend, ValidPaymentPass, ValidPayPass, ValidSelect} from '#{common}/shared/validator';
import {FlashMessagesService} from '#{service}/flash-messages.service';
import {LocalStorageService} from '#{service}/local-storage.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {

  public id = this.route.snapshot.queryParams['id'];
  public orderInfo;
  public walletData;
  public display: boolean;
  public chargeBool: boolean;
  public value: boolean;
  formPay: FormGroup;
  formCharge: FormGroup;
  paymentState:Boolean = false; // 订单成功
  public errorObj = {};
  public phoneNum = this.localStorage.get('phone');

  constructor(public router: Router,
              private route: ActivatedRoute,
              private orderService: OrderService,
              private companyService: CompanyService,
              private payService: PayService,
              private fb: FormBuilder,
              private flashMessages: FlashMessagesService,
              private localStorage: LocalStorageService) {
  }

  ngOnInit() {
    this.getOrderInfo();
    this.getWalletInfo();
    this.formPay = this.fb.group({
      payPass: ['',[ValidPaymentPass]],
      payWay: ['1',[ValidSelect]]
    });
    // this.formCharge = this.fb.group({
    //   chargeVal: ['', Validators.required]
    // })
  }

  /**
   * 获取订单信息
   */
  getOrderInfo() {
    this.orderService.getOrder({}, this.id).subscribe(
      res => {
        this.orderInfo = res;
        if (res['status']) {
          this.router.navigate(['/buyer/personal/order'], {queryParams: {type: ''}});
        }
      });
  }

  /**
   * 获取钱包信息
   */
  getWalletInfo() {
    this.companyService.getCompany().subscribe(
      res => {
        this.walletData = res;
      });
  }

  // 基金公司企业资料审核未通过不能开通钱包判断
  openWallet() {
    if (this.walletData.flag !== 1 ) {
      this.flashMessages.wechatprompt('企业资料审核仍未通过哦~别急嘛！');
    } else {
      this.router.navigate(['/shop/wallet'])
    }
  }

  /**
   * 前往充值
   */
  rechargeNow() {
    this.router.navigate(['/buyer/pay']);
  }

  /**
   * 确认支付
   * @param form
   */
  onSubmit(form) {
    if (!form.valid) {
      return false;
    }
    let price = this.orderInfo['money'];
    let balance = this.walletData['wallet'].balance / 100;

    if(price > balance){
      this.display = true;
      return false;
    }
    this.payService.oderPay({order_id: this.id, pwd: form.value.payPass}).subscribe(
      res => {
        this.flashMessages.wechatprompt(`<i class="ico-global ico-tip-green"></i><div class="mt-5 text-center">支付成功</div>`);
        let timer = setTimeout( () => {
          this.paymentState =true;
        }, 2000);
      },
      error => {
        this.flashMessages.wechatprompt('失败：'+error);
      });
  }

/*  /!**
   * 大于2000的订单提交
   * @param form
   * @return {boolean}
   *!/
  chargeSubmit(form) {
    if (!form.valid) {
      return false;
    }
    this.payService.checkPhoneCode({order_id: this.orderInfo['id'], code: form.value.chargeVal}).subscribe(
      res => {
        this.payService.oderPay({order_id: this.orderInfo['id'], pwd: this.formPay.value.payPass}).subscribe(
          result => {
            this.flashMessages.wechatprompt('订单支付成功');
            this.router.navigate(['/buyer/personal/order', this.orderInfo['id']]);
          },
          error => {
            this.errorObj['passError'] = error;
          });
      });
  }

  /!**
   * 隐藏手机号码
   * @param tel
   * @return {any}
   *!/
  hideNumber(tel) {
    let reg = /^(\d{3})\d{4}(\d{4})$/;
    tel = tel.replace(reg, '$1****$2');
    return tel;
  }*/

}
