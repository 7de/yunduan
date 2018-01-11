import {Injectable} from '@angular/core';
import {MainComponent} from '../common/base/main-component';
import {HttpClientService} from './http-client.service';

@Injectable()
export class ManagerService extends MainComponent {
  private MANAGER_URL = '/managers';
  private MANAGER_FOUNDATIONS_URL = '/manager-foundations';

  constructor(protected http: HttpClientService) {
    super(http);
  }

  /**
   * 获取基金经理列表
   * @param params
   * @returns {Observable<any>}
   */
  getManagers(params) {
    return this.http.get(this.MANAGER_URL, params);
  }

  /**
   * 获取某个基金经理的信息
   * @param {Number} id
   * @param {Object} params
   * @returns {Observable<any>}
   */
  getManagerFoundations(id, params: Object) {
    return this.http.get(this.MANAGER_FOUNDATIONS_URL + '/' + id, params);
  }

  /**
   * 修改某个基金经理的信息
   * @param id
   * @param {Object} params
   * @returns {Observable<any>}
   */
  updateManager(id, params: Object) {
    return this.http.put(this.MANAGER_URL + '/' + id, params)
  }

  /**
   * 新增基金经理的信息
   * @param {Object} params
   * @returns {Observable<any>}
   */
  createManager(params: Object) {
    return this.http.post(this.MANAGER_URL, params)
  }

  /**
   * 删除基金经理
   * @param id
   * @returns {Observable<any>}
   */
  deleteManager(id) {
    return this.http.delete(this.MANAGER_URL + '/' + id)
  }
}
