import { Injectable } from '@angular/core';
import { MainComponent } from '../common/base/main-component';
import { HttpClientService } from './http-client.service';

const EmailUrl = '/business-notices'; // 邮件

@Injectable()
export class GetEmailService extends MainComponent {

  constructor(protected http: HttpClientService) {
    super(http);
  }

  /**
   * 获取邮件列表
   */
  getEmail(params) {
    return this.http.get(EmailUrl, params);
  }

  /**
   * 删除站内信
   */
  delete(id) {
    return this.http.delete(`/business-notices/${id}`)
  }

  /**
   * 
   */
  getCount(params = {}) {
    return this.http.get('/business-notice/count', params)
  }
}
