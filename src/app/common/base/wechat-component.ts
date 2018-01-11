import {HttpClientService} from '../../service/http-client.service';

export class WechatComponent {

  public static version = 'wechat';

  constructor(protected http: HttpClientService) {
    // //;(this.http.version);
    this.http.version = WechatComponent.version;
    // //;(this.http.version);
  }
}
