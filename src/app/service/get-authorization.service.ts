import {Injectable} from '@angular/core';
import {HttpClientService} from './http-client.service';
import {Config} from '../config/config';

const getinfoUrl = '/wechat-info'; // 获取授权的公众号信息


@Injectable()
export class GetAuthorizationService {

  constructor(protected http: HttpClientService) {
  }

  /**
   * 获取授权
   */
  getAuthorization() {
    this.http.version = Config.wechatApiVersion;
    return this.http.get(getinfoUrl);
  }

}
