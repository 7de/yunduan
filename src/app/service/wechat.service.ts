import {Injectable} from '@angular/core';
import {MainComponent} from '../common/base/main-component';
import {HttpClientService} from '../service/http-client.service';

@Injectable()
export class WechatService extends MainComponent {

  private indexUrl = '/wechat-info';

  constructor(protected http: HttpClientService) {
    super(http);
  }

  /*
 *请求公司共众号信息数据
 */

  getCompanyInfo() {
    return this.http.get(this.indexUrl);
  }

}
