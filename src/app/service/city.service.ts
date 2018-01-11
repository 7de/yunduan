import {Injectable} from '@angular/core';
import {BusinessComponent} from '../common/base/business.component';
import {HttpClientService} from './http-client.service';
import {Config} from '../config/config';

const citylistUrl = '/city-list';
const cityInfoUrl = '/city-info';
const cityAll = '/city-all';

@Injectable()
export class CityService extends BusinessComponent {

  constructor(protected http: HttpClientService) {
    super(http)
  }

  /**
   * 获取子城市列表
   */
  getCityList(params: Object, id) {
    this.http.version = Config.mainApiBusiness;
    Object.assign(params, {});
    return this.http.get(citylistUrl + '/' + id, params);
  }

  /**
   * 获取城市信息
   */
  getCityInfo(params: Object) {
    this.http.version = Config.mainApiBusiness;
    Object.assign(params, {expand: 'children,parent'});
    return this.http.get(cityInfoUrl, params);
  }

  /**
   * 获取省份、城市、区域
   */
  getAllCity(params: Object) {
    this.http.version = Config.mainApiBusiness;
    Object.assign(params, {});
    return this.http.get(cityAll, params);
  }
}
