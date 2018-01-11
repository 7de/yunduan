import {Injectable} from '@angular/core';
import {Config} from '../config/config';
import {HttpClientService} from './http-client.service';

const partnerUrl = '/pcmain/partner'; // 合作伙伴列表
const bannersUrl = '/pcmain/banners'; // 新官网banner图
const protocolUrl = '/protocols';  // 帮助中心
const newUrl = '/pcmain/news-list'; // 新闻列表页
const details = '/pcmain/news-info'; // 新闻详情页
const typeUrl = '/pcmain/category';

@Injectable()
export class SiteService {

  constructor(protected http: HttpClientService) {
  }

  /**
   * 首页合作伙伴
   * @param {Object} params
   * @param obj
   * @returns {Observable<any>}
   */
  partnerList(params: Object, obj) {
    this.http.version = Config.mainApiVersion;
    Object.assign(params, obj);
    return this.http.getWithoutLogin(partnerUrl, params);
  }

  /**
   * 首页banner图片
   * @param {Object} params
   * @param obj
   * @returns {Observable<any>}
   */
  bannerList(params: Object, obj) {
    this.http.version = Config.mainApiVersion;
    Object.assign(params, obj);
    return this.http.getWithoutLogin(bannersUrl, params);
  }

  /**
   * 获取新闻列表
   * @param {Object} params
   * @param obj
   * @returns {Observable<any>}
   */
  newsList(params: Object, obj) {
    this.http.version = Config.mainApiVersion;
    Object.assign(params, obj);
    return this.http.getWithoutLogin(newUrl, params);
  }


  /**
   * 获取新闻详情的正文
   * @param {Object} params
   * @param id
   * @returns {Observable<any>}
   */
  newsDetails(params: Object, id) {
    this.http.version = Config.mainApiVersion;
    Object.assign(params, {expand: 'newsContent,prevArticle,nextArticle'});
    return this.http.getWithoutLogin(details + '/' + id, params)
  }

  /**
   * 帮助中心
   * @param id 帮助文档id
   * @returns {Observable<any>}
   */
  getProtocol(id) {
    this.http.version = Config.mainApiVersion;
    return this.http.getWithoutLogin(`${protocolUrl}/${id}`);
  }

  getNewType() {
    this.http.version = Config.mainApiVersion;
    return this.http.getWithoutLogin(typeUrl);
  }

}
