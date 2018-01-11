import {Injectable} from '@angular/core';
import {MainComponent} from '../common/base/main-component';
import {HttpClientService} from '../service/http-client.service';
import {Config} from '../config/config';

const bookedUrl = '/appointments';

@Injectable()
export class OrderUsersService extends MainComponent {

  constructor(protected http: HttpClientService) {
    super(http)
  }

  /**
   * 获取预约用户列表
   */
  getOrderUsers(params: Object) {
    this.http.version = Config.mainApiVersion;
    Object.assign(params, {expand: 'user,profile,foundation'});
    return this.http.get(bookedUrl, params);
  }
}
