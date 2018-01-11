import {Injectable} from '@angular/core';
import {BusinessComponent} from '../common/base/business.component';
import {HttpClientService} from './http-client.service';
import {Config} from '../config/config';

const shopUrl = '/shop';
const serviceFeatures = '/service-features';
const shopStarsUrl = '/shop-stars';
const shopScoreUrl = '/shop-score';
const completeAuthUrl = '/finish-check';

@Injectable()
export class ShopService extends BusinessComponent {

  constructor(protected http: HttpClientService) {
    super(http)
  }

  /**
   * 创建店铺  传入的参数为json对象
   * 例子：{
    "name": "xx旗舰店",
    "company_name": "xx科技有限公司",
    "company_address": "高新技术产业园",
    "province_id": 2821,
    "city_id": 2835,
    "area_id": 2838,
    "phone": "18565703204",
    "qq": "67579722",
    "logo_url": "#logo",
    "introduction": "xx科技有限公司。。。。。。",
    "video_url": "#videos",
    "photos": [
        "#photo1",
        "#photo2"
    ],
    "features": [
        1
    ]
}
   */
  createShop(params: Object, obj) {
    this.http.version = Config.mainApiBusiness;
    Object.assign(params, obj);
    return this.http.post(shopUrl, params);
  }

  shopDetail(params: Object, id) {
    this.http.version = Config.mainApiBusiness;
    Object.assign(params);
    return this.http.get(shopUrl + '/' + id, params);
  }

  /**
   * 服务特点列表获取(公开接口)  【此接口不需要登录】
   */
  getServiceFeatures(params: Object) {
    this.http.version = Config.mainApiBusiness;
    Object.assign(params, {});
    return this.http.get(serviceFeatures, params);
  }

  /**
   * 当前登录商家的店铺信息获取
   */
  getLoginShopInfo(params: Object) {
    this.http.version = Config.mainApiBusiness;
    Object.assign(params, {expand: 'features,photos'});
    return this.http.get(shopUrl, params);
  }

  /**
   * 修改店铺信息   参数和创建店铺相同
   */
  updateShopInfo(params: Object, obj) {
    this.http.version = Config.mainApiBusiness;
    Object.assign(params, obj);
    return this.http.put(shopUrl, params);
  }

  /**
   * 店铺信息获取(公开接口)
   */
  getShopInfo(params: Object, id) {
    this.http.version = Config.mainApiBusiness;
    Object.assign(params, {expand: 'features,photos,commentNum,goodNum,medium,bad'});
    return this.http.getWithoutLogin(shopUrl + '/' + id, params);
  }

  /**
   * 获取店铺半年的三颗星级评分 需要登入
   */
  getShopStars(params: Object, day) {
    Object.assign(params, {day: day});
    return this.http.get(shopStarsUrl, params);
  }

  /**
   * 获取店铺时间区间的好中差评 传入一个json对象  需要登入
   */
  getShopScores() {
    return this.http.get(shopScoreUrl);
  }

  /**
   * 完成资质审核与钱包开户点击确认
   */
  completeAuth() {
    this.http.version = Config.mainApiBusiness;
    return this.http.get(completeAuthUrl);
  }
}
