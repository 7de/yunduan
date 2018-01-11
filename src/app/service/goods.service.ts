import {Injectable} from '@angular/core';
import {BusinessComponent} from '../common/base/business.component';
import {HttpClientService} from './http-client.service';
import {Config} from "../config/config";

const goodsUrl = '/goods';
const goodslistUrl = '/shop-service';
const goodsUpUrl = '/goods-up';
const goodsDownUrl = '/goods-down';

@Injectable()
export class GoodsService extends BusinessComponent {

  constructor(protected http: HttpClientService) {
    super(http)
  }

  /**
   * 更新商品
   */
  updateGoods(params: Object, id) {
    Object.assign(params, {});
    return this.http.put(goodsUrl + '/' + id, params);
  }

  /**
   * 创建商品接口
   *
   * 参数名  类型  必需  描述  示例 e.g.
   * demand_category_id  string  是  服务类型id  1
   * title  string  是  商品标题
   * price  string  是  商品价格
   * content  string  是  商品详情
   * img  string  是  商品图片组图  ["图片1","图片2","图片3"]
   * 实例：
   * let obj = {demand_category_id:2,title:"DreamweaverCS6网页设计与网站建设课堂实录(附光盘) 书 清华大学正版 刘贵国",price:"999.99",content:"DreamweaverCS6网页设计与网站建设   * 课堂实录(附光盘) 书 清华大学正版 刘贵国",img:["图片1","图片2","图片3"] }
   *  this. addGoods({},obj);
   */
  addGoods(params: Object, obj) {
    Object.assign(params, obj);
    return this.http.post(goodsUrl, params);
  }

  /**
   * 获取商家的服务类型下拉列表
   */
  getGoodsList(params: Object) {
    Object.assign(params, {});
    return this.http.get(goodslistUrl, params);
  }

  /**
   * 获取商品的基本信息
   */
  getGoodsInfo(params: Object, id) {
    Object.assign(params, {id: id, expand: 'images,shop,commentNum,goodNum,medium,bad'});
    return this.http.get(goodsUrl + '/' + id, params);
  }

  /**
   * 商家中心的商品列表
   */
  getCenterGoods(params: Object) {
    Object.assign(params, {});
    this.http.version = Config.mainApiBusiness;
    return this.http.get(goodsUrl, params);
  }

  /**
   * 删除商品
   */
  deleteGoods(params: Object, id) {
    Object.assign(params, {});
    return this.http.delete(goodsUrl + '/' + id, params);
  }

  /**
   * 商品上架
   * @param id 商品id
   * @returns {Observable<any>}
   */
  getUpGoods(id){
    return this.http.get(`${goodsUpUrl}/${id}`);
  }

  /**
   * 商品上架
   * @param id 商品id
   * @returns {Observable<any>}
   */
  getDownGoods(id){
    return this.http.get(`${goodsDownUrl}/${id}`);
  }
}
