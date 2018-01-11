import {Injectable} from '@angular/core';
import {HttpClientService} from './http-client.service';
import {Config} from '../config/config';
@Injectable()
export class PayService {
  public sellerDetailUrl = '/pays'; // 卖家交易明细
  public buyerDetailUrl = '/company/pays';  // 买家交易明细
  public businessCodeUrl = '/phone/code'; // 连连支付基金公司开户发送信息
  public companyCodeUrl = '/company/phone/code'; // 连连支付服务商开户发送信息
  public bankCodeUrl = '/bank-code'; // 获取银行编号
  public businessGetUser = '/pay-info'; // 服务商获取连连支付信息
  public fundGetUser = '/company/pay-info'; // 基金公司获取连连支付信息
  public walletUrl = '/company/set-id-card'; // 基金公司钱包开户
  public resetUrl = '/company/reset-pay-password'; // 基金公司重置支付密码
  public modifyUrl = '/company/update-pay-password'; // 基金公司修改支付密码
  public sellerModifyUrl = '/business/update-pay-password'; // 服务商修改支付密码
  public sellerResetUrl = '/business/reset-pay-password' // 服务商重置支付密码
  public buyerCashUrl = '/company/cash-apply';  // 基金公司提现
  public sellerCashUrl = '/business/cash-apply'; // 服务商提现
  public orderPayUrl = '/pay-order'; // 支付订单
  public codeUrl = '/check-pay-text'; // 支付订单大于2000的需要验证码

  constructor(public http: HttpClientService) {
  }

  // 卖家交易明细
  sellerDetail(params: Object) {
    this.http.version = Config.mainApiBusiness;
    Object.assign(params, {'expand': 'goods'});
    return this.http.get(this.sellerDetailUrl, params)
  }

  // 买家交易明细
  buyerDetail(params: Object) {
    this.http.version = Config.mainApiVersion;
    Object.assign(params, {'expand': 'goods'});
    return this.http.get(this.buyerDetailUrl, params)
  }


  /**
   * 连连支付商户开户发送短信
   * {{url}}/business/phone/code/1  为申请开户
   {{url}}/business/phone/code/2  为找回密码 或重置密码
   * @param {Object} params
   * @param type
   * @return {Observable<any>}
   */
  businessSendCode(params: Object, type) {
    this.http.version = Config.mainApiBusiness;
    Object.assign(params, {});
    return this.http.get(this.businessCodeUrl + '/' + type, params);
  }

  /**
   *  连连支付基金公司开户发送短信
   * @param {Object} params
   * @param type
   * @return {Observable<any>}
   */
  fundSendCode(params: Object, type) {
    this.http.version = Config.mainApiVersion;
    Object.assign(params, {});
    return this.http.get(this.companyCodeUrl + '/' + type, params);
  }

  /**
   * 获取银行编号
   * @param {Object} params
   * @param keyword
   * @return {Observable<any>}
   */
  getBankCode(params: Object, keyword) {
    this.http.version = Config.mainApiBusiness;
    Object.assign(params, {keyword: keyword});
    return this.http.get(this.bankCodeUrl, params);
  }

  /**
   * 商家获取连连支付用户信息
   * @param {Object} params
   * @return {Observable<any>}
   */
  businessGetUserInfo(params: Object) {
    this.http.version = Config.mainApiBusiness;
    Object.assign(params, {});
    return this.http.get(this.businessGetUser, params);
  }

  /**
   * 基金公司获取连连支付用户信息
   * @param {Object} params
   * @return {Observable<any>}
   */
  fundGetUserInfo(params: Object) {
    this.http.version = Config.mainApiVersion;
    Object.assign(params, {});
    return this.http.get(this.fundGetUser, params);
  }

  /**
   * 基金公司钱包开户
   * @param {Object} params
   * @param obj
   * @return {Observable<any>}
   */
  walletAccount(params: Object, obj) {
    this.http.version = Config.mainApiVersion;
    Object.assign(params, obj);
    return this.http.post(this.walletUrl, params);
  }

  /**
   * 基金公司重置支付密码a
   * @param {Object} params
   * @param obj
   * @return {Observable<any>}
   */
  resetPass(params: Object) {
    this.http.version = Config.mainApiVersion;
    Object.assign(params);
    return this.http.post(this.resetUrl, params);
  }

  /**
   * 基金公司修改支付密码
   * @param {Object} params
   * @returns {Observable<any>}
   */
  modifyPass(params: Object) {
    this.http.version = Config.mainApiVersion;
    Object.assign(params);
    return this.http.post(this.modifyUrl, params);
  }

  /**
   * 买家提现
   * @param {Object} params
   * @returns {Observable<any>}
   */
  buyerCash(params: Object) {
    this.http.version = Config.mainApiVersion;
    Object.assign(params);
    return this.http.post(this.buyerCashUrl, params)
  }

  sellerCash(params: Object) {
    this.http.version = Config.mainApiBusiness;
    Object.assign(params);
    return this.http.post(this.sellerCashUrl, params)
  }

  /**
   * 服务商修改支付密码
   * @param {Object} params
   * @returns {Observable<any>}
   */
  sellerModifyPass(params: Object) {
    this.http.version = Config.mainApiBusiness;
    Object.assign(params);
    return this.http.post(this.sellerModifyUrl, params)
  }

  /**
   * 服务商重置支付密码
   * @param {Object} params
   * @returns {Observable<any>}
   */
  sellerResetPass(params: Object) {
    this.http.version = Config.mainApiBusiness;
    Object.assign(params);
    return this.http.post(this.sellerResetUrl, params)
  }

  /**
   * 大于2000的订单需要验证码
   * @param obj
   * @param params
   * @return {Observable<any>}
   */
  checkPhoneCode(obj, params?) {
    this.http.version = Config.mainApiVersion;
    return this.http.put(this.codeUrl, Object.assign({}, params, obj));
  }

  /**
   * 支付订单
   * @param obj
   * @param params
   * @return {Observable<any>}
   */
  oderPay(obj, params?) {
    this.http.version = Config.mainApiVersion;
    return this.http.post(this.orderPayUrl, Object.assign({}, params, obj));
  }
}
