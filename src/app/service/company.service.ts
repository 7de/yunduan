import {Injectable} from '@angular/core';
import {HttpClientService} from './http-client.service';
import {Cookie} from 'ng2-cookies';
import {MainComponent} from '../common/base/main-component';
import {LocalStorageService} from './local-storage.service';
import {Config} from '../config/config';


@Injectable()
export class CompanyService extends MainComponent {
  public error;

  private companyUrl = '/company';
  private loginUrl = '/account-login';
  private passGuide = '/company/pass-guide';

  constructor(protected http: HttpClientService,
              private localStorage: LocalStorageService) {
    super(http);
  }

  // V1.3
  // public login(headers) {
  //   this.http.version = Config.mainApiVersion;
  //   return this.http.get(this.companyUrl, {'expand': 'extinfo'}, {headers: headers});
  // }

  // V1.4
  public login(headers, params?: Object) {
    this.http.version = Config.mainApiBusiness;
    return this.http.post(this.loginUrl, params, {headers: headers});
  }

  public logout(): void {
    Cookie.delete('currentCompanyAuthorization', '/');
    this.localStorage.removeAll();
  }

  // 获取当前公司信息
  public getCompany() {
    this.http.version = Config.mainApiVersion;
    return this.http.get(this.companyUrl, {'expand': 'extinfo,wallet'});
  }

  /**
   * 修改某个基金经理的信息
   * @param id
   * @param {Object} params
   * @returns {Observable<any>}
   */
  update(id, params: Object) {
    return this.http.put(this.companyUrl + '/' + id, params)
  }


  /**
   * 完成指引
   * @returns {Observable<any>}
   */
  getPassGuide() {
    this.http.version = Config.mainApiVersion;
    return this.http.post(this.passGuide, {});
  }
}
