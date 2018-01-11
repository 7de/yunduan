import {Injectable} from '@angular/core';
import {Config} from '../config/config';
import {MainComponent} from '../common/base/main-component';
import {HttpClientService} from './http-client.service';
import {Cookie} from 'ng2-cookies';
import {Subject} from 'rxjs/Subject';

const mailUrl = '/business-notices'; // 站内信
const countUrl = '/business-notice/count'; // 获取站内信条数

@Injectable()
export class MailService extends MainComponent {

  private subject = new Subject();

  constructor(protected http: HttpClientService) {
    super(http)
  }

  /**
   * 站内信列表【基金公司】
   * @param {Object} params
   * @returns {Observable<any>}
   */

  getBuyerMail(params: Object) {
    if (Cookie.get('currentCompanyAuthorization')) {
      this.http.version = Config.mainApiVersion;
      Object.assign(params, {'expand': 'order,goods'});
      return this.http.get(mailUrl, params)
    }
    return this.subject;
  }

  /**
   * 获取站内信条数【基金公司】
   * @param {Object} params
   * @returns {Observable<any>}
   */
  getBuyerMailCount(params: Object) {
    if (Cookie.get('currentCompanyAuthorization')) {
      this.http.version = Config.mainApiVersion;
      Object.assign(params, {'expand': 'order,goods'});
      return this.http.get(countUrl, params)
    }
    return this.subject;
  }

  /**
   * 站内信列表【服务商】
   * @param {Object} params
   * @returns {Observable<any>}
   */

  getSellerMail(params: Object) {
    if (Cookie.get('currentCompanyAuthorization')) {
      this.http.version = Config.mainApiBusiness;
      Object.assign(params, {'expand': 'order,goods'});
      return this.http.get(mailUrl, params)
    }
    return this.subject;

  }

  /**
   * 获取站内信条数【服务商】
   * @param {Object} params
   * @returns {Observable<any>}
   */
  getSellerMailCount(params: Object) {
    if (Cookie.get('currentCompanyAuthorization')) {
      this.http.version = Config.mainApiBusiness;
      Object.assign(params, {'expand': 'order,goods'});
      return this.http.get(countUrl, params)
    }
    return this.subject;
  }
}
