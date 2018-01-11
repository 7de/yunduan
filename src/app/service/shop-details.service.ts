import {Injectable} from '@angular/core';
import {BusinessComponent} from '../common/base/business.component';
import {HttpClientService} from './http-client.service';

const shopInfoUrl = '/shop';

@Injectable()
export class ShopDetailsService extends BusinessComponent {

  constructor(protected http: HttpClientService) {
    super(http)
  }

  /**
   * 获取店铺详情
   */
  getshopInfo(params: Object, id) {
    Object.assign(params, {expand: 'features,photos'});
    return this.http.get(shopInfoUrl + '/' + id, params);
  }
}
