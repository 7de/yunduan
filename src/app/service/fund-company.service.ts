import {Injectable} from '@angular/core';
import {MainComponent} from '../common/base/main-component';
import {HttpClientService} from './http-client.service';
import {Config} from '../config/config';

const singleInfoUrl = '/company/profile';
const getuserinfo = '/company';

@Injectable()
export class FundCompanyService extends MainComponent {

  constructor(protected http: HttpClientService) {
    super(http)
  }

  /**
   * 获取基金公司个人资料
   */
  getFundCompanyInfo(params: Object) {
    this.http.version = Config.mainApiVersion;
    Object.assign(params, {});
    return this.http.get(singleInfoUrl, params);
  }

  /**
   * 获取基金公司个人资料
   */
  getuserinfofn(params: Object) {
    this.http.version = Config.mainApiVersion;
    Object.assign(params, {});
    return this.http.get(getuserinfo, params);
  }

  /**
   * 修改基金公司个人资料
   */
  updateFundCompanyInfo(params: Object) {
    this.http.version = Config.mainApiVersion;
    Object.assign(params, {});
    return this.http.put(singleInfoUrl, params);
  }

}
