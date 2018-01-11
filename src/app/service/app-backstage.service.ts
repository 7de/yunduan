import {Injectable} from '@angular/core';
import {HttpClientService} from './http-client.service';
import {Config} from '../config/config';

@Injectable()
export class AppBackstageService {
  // 接口地址
  public companyInfolUrl = '/company';       // 获取公司介绍和业务范围
  public editIntroduce = '/company/info';    // 编辑公司介绍和业务范围
  public addBanner = '/banner-imgs';         // 添加Banner图
  public deleteBanner = '/banner-imgs';      // 删除或修改Banner图
  public BannerInfo = '/banner-imgs';        // 获取Banner图信息或Banner图列表

  public noticeListUrl = '/company-articles';   // 获取公告列表
  public deleteNoticeUrl = '/company-articles'; // 删除单条新闻
  public addNoticeUrl = '/company-articles';    // 添加公告管理
  public updateNoticeUrl = '/company-articles'  // 修改公告管理
  public selectNoticeUrl = '/company-articles'; // 获取单条公告信息详情

  public FeedbackListUrl = '/feed-backs';    // 获取意见反馈列表
  public feedbackDetailsUrl = '/feed-backs'; // 获取单个意见反馈的详情
  public deleteFeedbackUrl = '/feed-backs';  // 删除意见反馈

  constructor(public http: HttpClientService) {
  }

  // 获取公司介绍和业务范围  (公司简介:description 、业务范围:business_scope)
  getCompanyInfo() {
    this.http.version = Config.mainApiVersion;
    return this.http.get(this.companyInfolUrl, {'expand': 'extinfo'});
  }

  // 编辑公司介绍或业务范围  (公司简介:description 、业务范围:business_scope)
  editCompanyInfo(params: Object) {
    return this.http.post(this.editIntroduce, params);
  }

  // 添加Banner
  addCarousel(params: Object) {
    return this.http.post(this.addBanner, params);
  }

  // 删除Banner图
  deleteCarousel(id) {
    return this.http.delete(this.deleteBanner + '/' + id);
  }

  // 修改Banner图
  changeCarousel(id, params: Object) {
    return this.http.put(this.deleteBanner + '/' + id , params);
  }

  // 获取Banner图信息或Banner图列表
  getCarouselInfo() {
    this.http.version = Config.mainApiVersion;
    return this.http.get(this.BannerInfo);
  }

  // 获取公告列表
  noticeList(obj: Object, params?) {
    this.http.version = Config.mainApiVersion;
    Object.assign(obj, params);
    return this.http.get(this.noticeListUrl, obj);
  }

  // 删除单条公告
  deleteNotice(id) {
    return this.http.delete(this.deleteNoticeUrl + '/' + id);
  }

  // 添加公告
  addNotice(params: Object) {
    return this.http.post(this.addNoticeUrl, params);
  }

  // 修改公告管理
  updateNotice(params: Object , id) {
    return this.http.put(this.updateNoticeUrl + '/' + id , params);
  }

  // 查询单条公告信息
  selectNotice(id) {
    return this.http.get(this.selectNoticeUrl + '/' + id );
  }

  // 获取意见反馈列表（搜索加real_name）
  FeedbackList(obj: Object, params?) {
    this.http.version = Config.mainApiVersion;
    Object.assign(obj, params);
    return this.http.get(this.FeedbackListUrl, obj);
  }

  // 获取单个意见详情
  feedbackDetails(params: Object , id) {
    this.http.version = Config.mainApiVersion;
    return this.http.get(this.feedbackDetailsUrl + '/' + id , params);
  }

  // 删除意见反馈
  deleteFeedback(id) {
    return this.http.delete(this.deleteFeedbackUrl + '/' + id);
  }
}
