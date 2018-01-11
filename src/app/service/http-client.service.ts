import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, ResponseContentType} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {LoaderService} from './loader.service';
import {Config} from '../config/config';
import {Router} from '@angular/router';
import {Cookie} from 'ng2-cookies';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/throw';
import {FlashMessagesService} from '#{service}/flash-messages.service';
import 'rxjs/add/observable/of';


@Injectable()
export class HttpClientService {

  public version;

  constructor(private loaderService: LoaderService,
              private http: Http,
              private router: Router,
              private flashMessages: FlashMessagesService) {
  }

  /**
   * 不用登录的 get 请求
   * @param {string} url
   * @param params
   * @param reqOpts
   * @returns {Observable<any>}
   */
  getWithoutLogin(url: string, params?, reqOpts?) {
    const headers = new Headers();
    return this.request(url, Object.assign({
      method: 'get',
      params: params,
      headers: headers,
      withCredentials: true
    }, reqOpts))
  }

  /**
   * 不用登录的post请求
   * @param {string} url
   * @param params
   * @param reqOpts
   * @return {Observable<any>}
   */
  postWithoutLogin(url: string, params?, reqOpts?) {
    const headers = new Headers();
    return this.request(url, Object.assign({
      method: 'post',
      params: params,
      headers: headers,
      withCredentials: true
    }, reqOpts))
  }

  /**
   * 登录了商品浏览记录
   *
   * @param {string} url
   * @param headers
   * @param params
   * @param reqOpts
   * @returns {Observable<any>}
   */
  getGoodsWithoutLogin(url: string, headers?, params?, reqOpts?) {
    return this.request(url, Object.assign({
      method: 'get',
      params: params,
      headers: headers,
      withCredentials: true
    }, reqOpts))
  }

  /**
   * get 请求
   * @param {string} url
   * @param params
   * @param reqOpts
   * @returns {Observable<any>}
   */
  get(url: string, params?, reqOpts?) {
    return this.request(url, Object.assign({method: 'get', params: params}, reqOpts))
  }

  post(url, data, reqOpts?) {
    return this.request(url, Object.assign({method: 'post', body: data}, reqOpts))
  }

  put(url, data?, reqOpts?) {
    return this.request(url, Object.assign({method: 'put', body: data}, reqOpts))
  }


  delete(url, params?, reqOpts?) {
    return this.request(url, Object.assign({method: 'delete', body: params}, reqOpts))
  }

  /**
   * 导出 excel
   * @param {string} url
   * @param params
   * @returns {Observable<Blob>}
   */
  exportExcel(url: string, params?) {
    const newReqOpts = Object.assign({
      method: 'get',
      params: params,
      headers: this.createAuthorizationHeader(),
      responseType: ResponseContentType.Blob
    });
    return this.http.request(this.getFullUrl(url), new RequestOptions(newReqOpts))
      .map(res => new Blob([res.json()], {type: 'application/vnd.ms-excel'}));
  }

  /**
   * 上传单个文件
   * @param url
   * @param file
   * @param reqOpts
   * @returns {Observable<any>}
   */
  uploadFile(url: string, file, reqOpts?: RequestOptions) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.request(url, Object.assign({method: 'post', body: formData}, reqOpts));
  }

  /**
   * 请求
   * @param {string} url
   * @param {RequestOptions} reqOpts
   * @returns {Observable<any>}
   */
  request(url: string, reqOpts: RequestOptions) {
    const headers = reqOpts.headers || this.createAuthorizationHeader();
    const newReqOpts = Object.assign({headers: headers}, reqOpts);
    this.requestInterceptor(); // 拦截请求
    const fullUrl = this.getFullUrl(url); // 获取整个请求的地址
    return this.http.request(fullUrl, new RequestOptions(newReqOpts))
      .map(res => res.json())
      .map(this.preprocessRes.bind(this)) // 对返回数据进行统一预处理
      .catch(this.handleErr.bind(this))// 对请求错误统一处理
      .finally(() => {
        this.onFinally(); // 动画操作
      })
  }

  /**
   * Build full URL for request.
   * @param str
   * @returns {string}
   */
  private getFullUrl(str): string {
    return Config.apiDomain + this.version + str;
  }

  /**
   * 拦截请求
   */
  private requestInterceptor() {
    // this.loaderService.showLoading(); // 开启加载动画
  }

  /**
   * 关闭加载动画
   */
  private responseInterceptor() {
    this.loaderService.hideLoading();
  }

  /**
   * 最后
   */
  private onFinally() {
    this.responseInterceptor();
  }

  private handleErr(error: any) {
    let errMsg;
    if (error.status === 401) {
      errMsg = '账号或密码错误，请重输入';
    } else {
      const body = JSON.parse(error._body);
      errMsg = (body.message) ? body.message : 'Server error';
    }

    return  Observable.throw(errMsg ? errMsg : '');
  }

  private preprocessRes(res): Object {
    return res.data;
  }

  private createAuthorizationHeader() {
    const headers = new Headers();
    const authorization = Cookie.get('currentCompanyAuthorization');
    if (!authorization) {
      // ;('登录过期，请重新登录');
      this.router.navigateByUrl('/login/user-login');
    }
    headers.append('Authorization', authorization);
    headers.append('Accept', 'application/json');
    // headers.append('Content-Type', 'application/json; charset=utf-8');
    return headers;
  }
}
