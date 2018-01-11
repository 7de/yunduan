import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Cookie } from 'ng2-cookies';
import { BusinessComponent } from '../common/base/business.component';
import { LocalStorageService } from './local-storage.service';
import { Config } from '../config/config';

const passwordModify = '/business/update-pass'; // 服务商修改登录密码
@Injectable()
export class FacilitatorService extends BusinessComponent {

  public businessUrl = '/business';

  constructor(protected http: HttpClientService,
    private localStorage: LocalStorageService) {
    super(http)

  }
  public login(headers) {
    this.http.version = Config.mainApiBusiness;
    return this.http.get(this.businessUrl, { 'expand': 'shop' }, { headers: headers });
  }

  public logout(): void {
    Cookie.delete('currentCompanyAuthorization', '/');
    this.localStorage.removeAll();
  }

  public getCompany() {
    this.http.version = Config.mainApiBusiness;
    return this.http.get(this.businessUrl, { 'expand': 'shop' });
  }

  public passwordModify(params: Object) {
    this.http.version = Config.mainApiBusiness;
    return this.http.post(passwordModify, params)
  }

  public modifyPassword(params: Object) {
    this.http.version = 'v1';
    return this.http.put('/company/pass', params)
  }

}
