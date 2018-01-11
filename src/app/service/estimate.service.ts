import { Injectable } from '@angular/core';
import {MainComponent} from '../common/base/main-component';
import {HttpClientService} from './http-client.service';
import {Config} from '../config/config';


const buyerCompany = '/my-comments'; // 基金公司===我的评价列表Url
const sellerCompany = '/from-business/comments'; // 基金公司===卖家评价列表
const replyBoss = '/comments'; // 卖家回复卖家
const replyCompany = '/reappraise'; // 买家追加回复卖家
const buyerBoss = '/comments-list'; // 商家===买家评价列表Url
const sellerBoss = '/comments-list-b'; // 商家===我的评价列表Url
const estimate = '/comments'; // 买家评价卖家/卖家评价买家
const reply = '/reply'; // 买家回复卖家/卖家回复买家


@Injectable()
export class EstimateService extends MainComponent {

  constructor(protected http: HttpClientService) {
    super(http)
  }


  /**
   * 基金公司===获取买家评价列表===get请求
   */
  getBuyerCompany(params: Object) {
    this.http.version = Config.mainApiVersion;
    Object.assign(params, {'expand': 'reply,goods'});
    return this.http.get(buyerCompany, params)
  }

  /**
   *基金公司===获取卖家评价列表===get请求
   */
  getSellerCompany(params: Object) {
    this.http.version = Config.mainApiVersion;
    Object.assign(params, {'expand': 'reply,goods'});
    return this.http.get(sellerCompany, params)
  }

  /**
   * 基金公司==买家评价卖家===post请求
   */
  estimateToSeller(params: Object) {
    this.http.version = Config.mainApiVersion;
    return this.http.post(replyBoss, params)
  }

  /**
   * 基金公司===买家回复卖家的评价===post请求
   */
  replyToSeller(params: Object) {
      this.http.version = Config.mainApiVersion;
      Object.assign(params, {});
      return this.http.post(reply, params)
  }


  /*
  * 服务商===获取买家评价列表===get请求
  **/
  getBuyerBoss(params: Object) {
    this.http.version = Config.mainApiBusiness;
    Object.assign(params, {'expand': 'goods,reply'});
    return this.http.get(buyerBoss, params)
  }

  /**
   * 服务商===获取我的评价列表===get请求
   */
  getSellerBoss(params: Object) {
    this.http.version = Config.mainApiBusiness;
    Object.assign(params, {'expand': 'goods,reply'});
    return this.http.get(sellerBoss, params)
  }

  /**
   * 服务商===卖家评价买家
   */
  estimateToBuyer(params: Object) {
    this.http.version = Config.mainApiBusiness;
    return this.http.post(replyBoss, params)
  }

  /**
   * 服务商===卖家回复买家===post请求
   */
  replyToBuyer(params: Object) {
    this.http.version = Config.mainApiBusiness;
    return this.http.post(reply, params)
  }

}
