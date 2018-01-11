import { Injectable } from '@angular/core';
import {MainComponent} from '../common/base/main-component';
import {HttpClientService} from '../service/http-client.service';

const AssociatedUrl = '/manager-foundations'; // 基金经理相关产品

@Injectable()
export class GetAssociatedProductService extends MainComponent  {

  constructor(protected http: HttpClientService) {
    super(http);
  }

  /**
   * 获取基金经理相关产品信息
   */
  getAssociatedProduct(id, params) {
    // Object.assign(params, {expand: 'percent,income,profile'});
    return this.http.get(AssociatedUrl + '/' + id, params);
  }

}
