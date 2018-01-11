import {Injectable} from '@angular/core';
import {BusinessComponent} from '../common/base/business.component';
import {HttpClientService} from './http-client.service';
import {Config} from '../config/config';
import {Headers} from '@angular/http';
import {Cookie} from 'ng2-cookies';

const servicesUrl = '/services';
const goodsListUrl = '/goods-list';
const frontGoodsUrl = '/front/goods';
const commentsUrl = '/shop-comments';
const storeUrl = '/shop';

/**
 * V1.4
 */
const recentScan = '/company/log';


@Injectable()
export class ShopShowService extends BusinessComponent {
  private searchGoodsUrl = '/search-goods';

  constructor(protected http: HttpClientService) {
    super(http)
  }

  /**
   * 前台服务商获取所有服务类型 传入json对象
   * {
        "id": 1,
        "title": "法律意见书",
        "mark": "法律意见书"
        }
   */
  getAllService(params: Object) {
    const headers = new Headers();
    this.http.version = Config.mainApiBusiness;
    Object.assign(params);
    return this.http.getWithoutLogin(servicesUrl, params, {headers: headers, withCredentials: true});
  }

  /**
   * 全站搜索商品
   * @param params
   * @returns {Observable<any>}
   */
  getAllGoods(params?) {
    this.http.version = Config.mainApiBusiness;
    return this.http.getWithoutLogin(this.searchGoodsUrl, params);
  }

  /**
   * 获取商品列表
   *
   * demand-category-id  string  否  服务类型id 通过前面的获取服务类型可以得到  1
   shop-id  string  否  店铺id 在服务商主页的时候必须要传  1
   sort  string  否  -score，-price，-sales_num 三种排序类型
   keyword  string  否  搜索关键词
   searchType  string  否  搜索类型 0代表商品名称 1代表服务商公司名称 2代表店铺名称
   expand  string  是  店铺附加信息  shop
   */
  /**  传参实例
   *   let obj = {demand-category-id:'',shop-id:'',sort-key:'',sort-val:'',keyword:'',searchType:'',searchType:'',expand:'shop'}  字段必须要写 没有的就为空
   *   this.getGoodsList({},obj);
   */
  getGoodsList(params: Object, obj) {
    const headers = new Headers();
    this.http.version = Config.mainApiBusiness;
    Object.assign(params, obj); // 这里需要注意的是 根据自己需要的参数传参
    return this.http.getWithoutLogin(goodsListUrl, params, {headers: headers, withCredentials: true});
  }

  /**
   * 前台获取店铺商品详情
   */
  getShopDetails(params: Object, id) {
    this.http.version = Config.mainApiBusiness;
    Object.assign(params, {expand: 'images,shop,commentNum,goodNum,medium,bad'});
    const headers = new Headers();
    const authorization = Cookie.get('currentCompanyAuthorization');
    if (authorization) {
      headers.append('Authorization', authorization);
      headers.append('Accept', 'application/json');
    }
    return this.http.getGoodsWithoutLogin(frontGoodsUrl + '/' + id, headers, params);
  }

  /**
   * 前台获取评价列表
   *
   * 参数名  类型  必需  描述  示例 e.g.
   *shop_id  string  是  店铺id  1
   * grade  string  否  0,1,2 代表好中差  0
   *expand  string  是  附加参数  child
   *goods_id  string  否  商品id 获取商品评价的时候需要
   *
   * let obj = {shop_id:1,grade:'',goods_id:12,expand:'child'}  传参实例 字段必须要传 不传的就为空
   * this.getCommentsList({},boj)
   */
  getCommentsList(params: Object) {
    this.http.version = Config.mainApiBusiness;
    Object.assign(params, {expand: 'company,reply,base'});
    return this.http.getWithoutLogin(commentsUrl, params);
  }

  /**
   * 店铺详情
   */

  getStoreDetails(params: Object, id?) {
    this.http.version = Config.mainApiBusiness;
    Object.assign(params, {expand: 'features,photos,commentNum,goodNum,medium,bad'});
    return this.http.getWithoutLogin(storeUrl + '/' + id, params);
  }

  /**
   * 个人中心获取最近浏览商品
   */
  recentScan(params: Object) {
    this.http.version = Config.mainApiVersion;
    Object.assign(params, {expand: 'goods'});
    return this.http.get(recentScan, params)
  }

}
