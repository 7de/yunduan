import {Injectable} from '@angular/core';
import {MainComponent} from '../common/base/main-component';
import {HttpClientService} from './http-client.service';

const productUrl = '/foundations';
const recordUrl = '/orders';
const incomesUrl = '/incomes';

@Injectable()
export class ProductService extends MainComponent {

  constructor(protected http: HttpClientService) {
    super(http)
  }

  /**
   * 获取产品列表
   */
  getProductList(params: Object) {
    Object.assign(params, {expand: 'percent,income,profile'});
    return this.http.get(productUrl, params);
  }

  /**
   *投资记录
   * */
  getRecord(params: Object) {
    Object.assign(params, {expand: 'profile'});
    return this.http.get(recordUrl, params);
  }

  /**
   * 历史净值
   **/
  getIncomes(params: Object) {
    return this.http.get(incomesUrl, params);
  }

  /**
   * 查看数据追踪
   * */
  getView(id, params: Object) {
    Object.assign(params, {expand: 'percent,income,profile,newIncome,manager,updateFee,showFee'});
    return this.http.get(`${productUrl}/${id}`, params);
  }


  create(params) {
    return this.http.post(productUrl, params);
  }

  update(id, params) {
    return this.http.put(`${productUrl}/${id}`, params);
  }
}
