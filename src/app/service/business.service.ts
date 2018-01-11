import {Injectable} from '@angular/core';
import {BusinessComponent} from '../common/base/business.component';
import {HttpClientService} from './http-client.service';
import {LocalStorageService} from './local-storage.service';
import {Config} from '../config/config';

const businessUrl = '/business';
const idcardUrl = '/business/set-id-card';
const setinfoUrl = '/business/set-info';
const resetpassUrl = '/business/reset-pass';
const serviceUrl = '/services';
const businessinfoUrl = '/business/profile';
const paymentUrl = '/business/reset-pay-password';
const smsUrl = '/phone/code/2';
const passUrl = '/business/pass-guide';

@Injectable()
export class BusinessService extends BusinessComponent {

  constructor(
    protected http: HttpClientService,
    protected localstorage: LocalStorageService
  ) {
    super(http)
  }

  /**
   * 服务商账号注册
   *
   * 参数名  类型  必需  描述  示例 e.g.
   * account_mobile  string  是  手机账号
   * password  string  是  密码
   * code  string  是  短信验证码
   *  实例：
   *   let obj = {account_mobile: "18565703204",password': "1234567",code: "6593"}
   *   this.businessRegiste({},obj)
   */
  businessRegiste(params: Object, obj) {
    Object.assign(params, obj);
    return this.http.post(businessUrl, params);
  }

  /*
  * 获取当前登录的服务商信息
  * */
  getBusiness(params?: Object) {
   this.http.version = Config.mainApiBusiness;
   return this.http.get(businessUrl, params);
  }

  /**
   * 获取服务商个人资料
   */
  getuserinfofn(params: Object) {
    this.http.version = Config.mainApiBusiness;
    Object.assign(params, {});
    return this.http.get(businessUrl, params);
  }

  /**
   * 获取当前登录的服务商信息
   * 参数名  类型  必需  描述  示例 e.g.
   */
  getRigisterInfo(params: Object) {
    Object.assign(params);
    return this.http.get(businessUrl, params);
  }

  /**
   * 实名认证
   * realname  string  是  真实姓名  张三
   *card_num  number  是  身份证号码  123456
   * card_image1  string  是  身份证正面图片地址
   * card_image2  string  是  身份证反面图片地址
   *  实例：
   *  let obj = {realname: "雷磊",card_num: '123456",card_image1: "#1",card_image2: "#2"}  参数必须要传
   *  this.getrigisterInfo({},obj)
   */
  getAuthenticated(params: Object, obj) {
    Object.assign(params, obj);
    return this.http.post(idcardUrl, params);
  }

  /**
   * 递交证明
   *  参数名  类型  必需  描述  示例 e.g.
   * card_image1  string  否  身份证正面图片地址
   * card_image2  string  否  身份证反面图片地址
   * license  string  是  营业执照图片地址
   * agreement  string  是  服务协议图片地址
   * account_permit  string  是  对公账号开户许可证图片地址
   * certificate  string  是  行业的资质证明
   * demand_ids  array  是  服务类型id
   *   实例：
   *   let obj = {card_image1: "#1",card_image2: "#2",license: "#3",agreement: "#4",account_permit: "#5",certificate: "#6",demand_ids: [
        1,
        3,
        4
    ]}  所有字段必须要 不传的参数为空
   *  this.setInfo({},obj)
   */
  setInfo(params: Object, obj) {
    Object.assign(params, obj);
    return this.http.post(setinfoUrl, params);
  }

  /**
   * 重置密码
   * 参数名  类型  必需  描述  示例 e.g.
   * phone  string  是  手机账号  18565703204
   * new_pass  string  是  新密码  1234567
   * code  string  是  短信验证码  6953
   *
   * 实例：
   * let obj = {phone: "18565703204",new_pass: "1234567",code: "6953"}
   * this.resetPass({},obj)
   */
  resetPass(params: Object, obj) {
    Object.assign(params, obj);
    return this.http.post(resetpassUrl, params);
  }

  /**
   * 服务类型获取
   */
  getServiceType(params: Object) {
    this.http.version = Config.mainApiBusiness;
    Object.assign(params, {});
    return this.http.get(serviceUrl, params);
  }

  /**
   * 获取服务商信息（公开接口）
   */
  getBusinessInfo(params: Object, id) {
    Object.assign(params, {expand: 'profile,shop'});
    return this.http.get(businessUrl + '/' + id, params);
  }

  /**
   * 获取当前登录的服务商个人资料
   */
  getSingleInfo(params: Object) {
    this.http.version = Config.mainApiBusiness;
    Object.assign(params, {});
    return this.http.get(businessinfoUrl, params);
  }

  /**
   * 修改当前登录的服务商个人资料
   *
   * 实例：
   * let obj = {nickname: "test",sex: 0,birthday: :"0",province_id: "2821",city_id: "2835",area_id: 2838,logo_url: ""}
   * this.updateSingleInfo({},obj)
   */

  updateSingleInfo(params: Object) {
    this.http.version = Config.mainApiBusiness;
    Object.assign(params);
    return this.http.put(businessinfoUrl, params);
  }

  /*
  * 重置支付密码 paymentUrl
  * */
  postPayment(params: Object) {
    Object.assign(params);
    return this.http.post(paymentUrl, params);
  }

  /*
  * 商户开户/重置支付密码发送短信 smsUrl
  * */
  getPaymentSms() {
    return this.http.get(smsUrl);
  }

  getPassGuide() {
    this.http.version = Config.mainApiBusiness;
    return this.http.post(passUrl, {})
  }
}
