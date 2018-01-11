import {Injectable} from '@angular/core';
import {MainComponent} from '../common/base/main-component';
import {HttpClientService} from './http-client.service';
import {Config} from '../config/config';

const orderUrl = '/business-orders'; // 订单
const finalUrl = '/order/final-date'; // 确认最终交付时间
const invoiceUrl = '/invoice'; // 发票
const invoicesUrl = '/invoices'; // 买家发票详情

const closeOrderUrl = '/order-close'; // 未付款订单--关闭交易 --买家
const checkOrderUrl = '/sure-finish'; // 最终确认交付 --买家
const cancelUrl = '/company-cancel-order'; // 申请取消订单 --买家
const agreeCancelUrl = '/company-agree-cancel'; // 同意取消订单 --买家
const platformUrl = '/company-apply-platform'; // 买家申请仲裁 --买家

const priceUrl = '/price'; // 修改价格 --卖家
const submitUrl = '/submit-final'; // 提交服务 --卖家
const planUrl = '/order/final-plan'; // 修改服务 -- 卖家
const cancelSellerUrl = '/cancel-order'; // 取消订单 --卖家
const agreeSellerUrl = '/agree-cancel-order'; // 同意取消订单 --卖家
const platformSellerUrl = '/apply-platform'; // 买家申请仲裁 --卖家
const closeSellerUrl = '/not-pay-cancel'; // 未付款订单--关闭交易 --卖家


@Injectable()
export class OrderService extends MainComponent {

  constructor(protected http: HttpClientService) {
    super(http)
  }

  /**
   * 创建订单
   * @param {Object} params
   * @param obj
   * @return {Observable<any>}
   */
  creatOrders(params: Object, obj) {
    this.http.version = Config.mainApiVersion;
    Object.assign(params, obj);
    return this.http.post(orderUrl, params);
  }

  /**
   * 订单信息-买家
   * @param {Object} params
   * @param {Number} id --订单id  有id为搜索订单详情否则为搜索订单列表
   * @returns {Observable<any>}
   */
  getOrder(params: Object, id?: Number) {
    this.http.version = Config.mainApiVersion;
    if (id) {
      Object.assign(params, {expand: 'shop,goods,file,companyProfile,businessPlan,finalPlan,cancelOrder'});
      return this.http.get(`${orderUrl}/${id}`, params);
    } else {
      Object.assign(params, {expand: 'shop,goods'});
      return this.http.get(orderUrl, params);
    }
  }

  /**
   * 订单信息-卖家
   * @param {Object} params
   * @param {Number} id --订单id  有id为搜索订单详情否则为搜索订单列表
   * @returns {Observable<any>
   */
  getSellerOrder(params: Object, id?: Number) {
    this.http.version = Config.mainApiBusiness;
    if (id) {
      Object.assign(params, {expand: 'shop,goods,file,companyProfile,businessPlan,finalPlan,cancelOrder,company'});
      return this.http.get(`${orderUrl}/${id}`, params);
    } else {
      Object.assign(params, {expand: 'shop,goods,companyProfile,company'});
      return this.http.get(orderUrl, params);
    }
  }

  /**
   * 确认最终交付-买家
   * @param id --订单id
   * @returns {Observable<any>}
   */
  getBuyersConfirm(id) {
    return this.http.get(`${finalUrl}/${id}`);
  }

  /**
   * 未付款订单--关闭交易 -买家
   * @param id --订单id
   * @returns {Observable<any>}
   */
  getCloseOrder(id) {
    return this.http.get(`${closeOrderUrl}/${id}`);
  }

  /**
   * 最终确认交付 -买家
   * @param id --订单id
   * @returns {Observable<any>}
   */
  getCheckOrder(id) {
    return this.http.get(`${checkOrderUrl}/${id}`);
  }

  /*
  * 申请发票 -买家
  * */
  postInvoice(params: Object, obj?) {
    Object.assign(params, obj);
    return this.http.post(invoiceUrl, params);
  }

  /*
  *申请取消订单 -买家
  * */
  putCancelOrder(params: Object) {
    Object.assign(params);
    return this.http.put(cancelUrl, params);
  }

  /*
  * 撤销取消订单 -买家
  * */
  getCancel(id) {
    return this.http.get(`${cancelUrl}/${id}`);
  }

  /*
  * 同意取消订单 -买家
  * */
  getAgreeCancel(id) {
    return this.http.get(`${agreeCancelUrl}/${id}`);
  }

  /*
  * 申请仲裁(客服介入) -买家
  * */
  getPlatform(id) {
    return this.http.get(`${platformUrl}/${id}`);
  }

  /*
  *修改订单价格 --卖家
  * */
  putPrice(params: Object) {
    this.http.version = Config.mainApiBusiness;
    Object.assign(params);
    return this.http.put(priceUrl, params);
  }

  /**
   * 最终确认时间 --卖家
   * @param {Object} params
   * @returns {Observable<any>
   */
  postSellerFinal(params: Object) {
    this.http.version = Config.mainApiBusiness;
    Object.assign(params);
    return this.http.post(finalUrl, params);
  }

  /*
  * 更新最终确认时间 --卖家
  * @param {Object} params
  * @returns {Observable<any>
  * */
  putSellerFinal(params: Object) {
    this.http.version = Config.mainApiBusiness;
    Object.assign(params);
    return this.http.put(finalUrl, params);
  }

  /*
  * 最终提交服务 --卖家
  * */
  postService(params: Object) {
    this.http.version = Config.mainApiBusiness;
    Object.assign(params);
    return this.http.post(submitUrl, params);
  }

  /*
  * 更新提交服务 --卖家
  * */
  putService(params: Object) {
    this.http.version = Config.mainApiBusiness;
    Object.assign(params);
    return this.http.put(planUrl, params);
  }

  /*
  * 申请取消订单 --卖家
  * */
  putSellerCancel(params: Object) {
    this.http.version = Config.mainApiBusiness;
    Object.assign(params);
    return this.http.put(cancelSellerUrl, params);
  }

  /**
   * 撤销取消订单 --卖家
   * @param id 订单id
   * @returns {Observable<any>}
   */
  getSellerCancel(id) {
    this.http.version = Config.mainApiBusiness;
    return this.http.get(cancelSellerUrl + '/' + id);
  }

  /**
   * 同意取消订单 --卖家
   * @param id 订单id
   * @returns {Observable<any>}
   */
  getSellerAgree(id) {
    this.http.version = Config.mainApiBusiness;
    return this.http.get(agreeSellerUrl + '/' + id);
  }

  /**
   * 申请仲裁(客服介入) --卖家
   * @param id 订单id
   * @returns {Observable<any>}
   */
  getSellerPlatform(id) {
    this.http.version = Config.mainApiBusiness;
    return this.http.get(platformSellerUrl + '/' + id);
  }

  /**
   * 取消订单 -- 未付款  --卖家
   * @param id 订单id
   * @returns {Observable<any>}
   */
  getSellerClose(id) {
    this.http.version = Config.mainApiBusiness;
    return this.http.get(closeSellerUrl + '/' + id);
  }

  /*
  * 发票列表 --卖家
  * */
  getSellerInvoiceList(params) {
    this.http.version = Config.mainApiBusiness;
    Object.assign(params);
    return this.http.get(invoiceUrl, params);
  }

  /**
   * 发票详情 --卖家
   * @param id 发票id
   * @returns {Observable<any>}
   */
  getSellerInvoiceDetails(id) {
    this.http.version = Config.mainApiBusiness;
    return this.http.get(`${invoiceUrl}/${id}`);
  }

  /**
   * 发票详情 - 买家
   */
  getBuyerInvoiceDetails(id) {
    this.http.version = Config.mainApiVersion;
    return this.http.get(`${invoicesUrl}/${id}`);
  }

  /*
  * 开取发票 --卖家
  * */
  putOpenInvoice(paramr) {
    this.http.version = Config.mainApiBusiness;
    return this.http.put(invoiceUrl, paramr);
  }

  /*
  * 发票类型 --卖家
  * */
  postInvoiceType(params) {
    this.http.version = Config.mainApiBusiness;
    return this.http.post(invoiceUrl+'/type', params);
  }


}
