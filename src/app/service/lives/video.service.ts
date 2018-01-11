import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Config } from '../../config/config';

@Injectable()
export class VideoService {

  private typeUrl = '/modify-video-type';
  private videoAndPictureUrl = '/media';
  private video_ListUrl = '/-serial';
  private searchUrl = '/searchMedia';
  private singleVideo = '/media-front-video';
  private commentNowUrl = '/media-comment';

  private url = '/media-videos'; // 1.4.1
  private videoListUrl = '/media-video/my-list'; // 1.4.1
  private mySerialUrl = '/media-info/my-list'; // 1.4.1
  private serialTypeUrl = '/info-types'; // 1.4.1
  private serialUrl = '/media-infos' // 1.4.1
  private commentsUrl = '/media-comments'; // 1.4.1
  private bannerUrl = '/media-info/banner-list'; // 1.4.1
  private hotLivesUrl = '/media-authors'; // 1.4.1
  public searchAllLivesUrl = '/media/search'; // 1.4.1
  public classInfoUrl = '/media-author/my-info'; // 1.4.1
  private videosNumUrl = '/media-video/my-count'; // 1.4.1
  private serialCountUrl = '/media-info/my-count'; // 1.4.1
  private addPvCount = '/media-video/insert-pv'; // 1.4.1

  constructor(protected http: HttpClientService) {
  }

  /**
   * 获取一个视频
   * @param id
   * @param params
   * @returns {Observable<any>}
   */
  one(id, params?) {
    this.http.version = Config.mainApiVersion;
    return this.http.get(`${this.url}/${id}`, Object.assign({}, params));
  }

  /**
   * 获取所有数据
   * @param params
   * @returns {Observable<any>}
   */
  all(params?) {
    this.http.version = Config.mainApiVersion;
    return this.http.get(this.url, Object.assign({}, params));
  }

  /**
   * 获取视频和图片
   * @param params
   * @return {Observable<any>}
   */
  getVideoAndPicture(params?) {
    this.http.version = Config.mainApiVersion;
    return this.http.getWithoutLogin(this.videoAndPictureUrl, Object.assign({}, params));
  }

  /**
   * 获取非连载单个视频 前台获取
   * @param id
   * @param params
   * @return {Observable<any>}
   */
  getSingleVideo(id, params?) {
    this.http.version = Config.mainApiVersion;
    return this.http.getWithoutLogin(`${this.singleVideo}/${id}`, Object.assign({}, params));
  }

  /**
   * 获取媒体评论
   * @param id
   * @param type
   * @param params
   * @return {Observable<any>}
   */
  // getComments(id, type, params?) {
  //   this.http.version = Config.mainApiVersion;
  //   return this.http.getWithoutLogin(`${this.commentsUrl}/${id}`, Object.assign({media_type: type}, params));
  // }

  /**
   * 评论
   * @param id
   * @param type
   * @param content
   * @param params
   * @return {Observable<any>}
   */
  commentNow(id, type, content, params?) {
    this.http.version = Config.mainApiVersion;
    return this.http.post(this.commentNowUrl, Object.assign({
      media_id: id,
      media_type: type,
      content: content
    }, params));
  }

  /**
   * 获取视频连载列表
   * @param id 视频连载id
   * @param params
   * @return {Observable<any>}
   */
  // getVideoList(id, params?) {
  //   this.http.version = Config.mainApiVersion;
  //   return this.http.getWithoutLogin(`${this.videosUrl}/${id}`, Object.assign({}, params));
  // }

  /**
   * 获取连载
   * @param params
   * @param type
   * @param sort
   * @return {Observable<any>}
   */
  // getSerialList(params, type, sort?) {
  //   Object.assign(params, {type: type, sort: sort});
  //   this.http.version = Config.mainApiVersion;
  //   return this.http.getWithoutLogin(this.videoListUrl, params);
  // }

  /**
   * 获取非连载
   * @param params
   * @param type
   * @param sort
   * @return {Observable<any>}
   */
  get_SerialList(params, type, sort?) {
    Object.assign(params, { type: type, sort: sort });
    this.http.version = Config.mainApiVersion;
    return this.http.getWithoutLogin(this.video_ListUrl, params);
  }

  /**
   * 大讲坛搜索
   * @param params
   * @param obj
   * @return {Observable<any>}
   */
  getSearchResult(params, obj) {
    Object.assign(params, obj);
    this.http.version = Config.mainApiVersion;
    return this.http.getWithoutLogin(this.searchUrl, params);
  }

  /**
   * 删除
   * @param id
   * @returns {Observable<any>}
   */
  deleteOne(id) {
    this.http.version = Config.mainApiVersion;
    return this.http.delete(this.url + '/' + id)
  }


  create(params) {
    this.http.version = Config.mainApiVersion;
    return this.http.post(this.url, params);
  }

  update(id, params) {
    this.http.version = Config.mainApiVersion;
    return this.http.put(`${this.url}/${id}`, params);
  }


  /**
   * 修改视频连载
   * @param id
   * @param mediaId
   * @returns {Observable<any>}
   */
  updateMediaId(id, mediaId) {
    this.http.version = Config.mainApiVersion;
    return this.http.put(this.typeUrl, { media_id: mediaId, video_id: id });
  }

  /**
   *  1.4.1版本
   * 创建连载
   * @param {Object} params
   * @return {Observable<any>}
   */
  createSerial(params, id?) {
    this.http.version = Config.mainApiVersion;
    let URL = this.serialUrl;
    if (id) {
      URL += id ? `/${id}` : '';
      return this.http.put(URL, params)
    } else {
      return this.http.post(URL, params)
    }
  }

  /**
   * 1.4.1版本
   * 获取视频素材列表
   * @param status
   * @param title
   * @param {Object} params
   * @return {Observable<any>}
   */
  getVideoList(params = {}) {
    this.http.version = Config.mainApiVersion;
    return this.http.get(this.videoListUrl, params);
  }


  /**
   *  1.4.1版本
   * 获取我的视频素材数量
   * @param {Object} params
   * @return {Observable<any>}
   */
  getVideosMaterialNum(params?: Object) {
    this.http.version = Config.mainApiVersion;
    return this.http.get(this.videosNumUrl, Object.assign({}, params));
  }

  /**
   * 1.4.1版本
   *  删除视频素材
   * @param id
   * @param {Object} params
   * @return {Observable<any>}
   */
  deleteVideo(id, params?: Object) {
    this.http.version = Config.mainApiVersion;
    return this.http.delete(`${this.url}/${id}`, Object.assign({}, params));
  }

  /**
   * 1.4.1版本
   * 获取我的连载
   * @param {Object} params
   * @return {Observable<any>}
   */
  getMySerial(params = {}) {
    this.http.version = Config.mainApiVersion;
    return this.http.get(this.mySerialUrl, params);
  }

  /**
   *  1.4.1版本
   * 获取我的连载类型
   * @param {Object} params
   * @return {Observable<any>}
   */
  getMySerialType(params?: Object) {
    this.http.version = Config.mainApiVersion;
    return this.http.get(this.serialTypeUrl, Object.assign({}, params));
  }

  /**
   * 1.4.1版本
   *  删除我的连载
   * @param id
   * @param {Object} params
   * @return {Observable<any>}
   */
  deleteMySerial(id, params?: Object) {
    this.http.version = Config.mainApiVersion;
    return this.http.delete(`${this.serialUrl}/${id}`, Object.assign({}, params));
  }

  /**
   * 1.4.1版本
   *  获取视频信息
   * @param id
   * @param {Object} params
   * @return {Observable<any>}
   */
  getVideoInfo(id, params?: Object) {
    this.http.version = Config.mainApiVersion;
    return this.http.getWithoutLogin(`${this.url}/${id}`, Object.assign({ expand: 'media_info,media_author' }, params));
  }

  /**
   * 1.4.1 版本
   *  获取视频列表
   * @param obj
   * @param {Object} params
   * @return {Observable<any>}
   */
  getVideosList(obj, params?: Object) {
    this.http.version = Config.mainApiVersion;
    return this.http.getWithoutLogin(this.url, Object.assign({}, params, obj));
  }

  /**
   *  1.4.1 版本
   * 获取评论 视频/图文
   * @param obj
   * @param {Object} params
   * @return {Observable<any>}
   */
  getComments(obj, params?: Object) {
    this.http.version = Config.mainApiVersion;
    return this.http.getWithoutLogin(this.commentsUrl, Object.assign({}, params, obj));
  }

  /**
   *  1.4.1 版本
   * 添加评论
   * @param obj
   * @param {Object} params
   * @return {Observable<any>}
   */
  addComments(obj, params?: Object) {
    this.http.version = Config.mainApiVersion;
    return this.http.post(this.commentsUrl, Object.assign({}, params, obj));
  }

  /**
   * 1.4.1 版本
   *  获取banner图
   * @return {Observable<any>}
   */
  getBanner(params?: Object) {
    this.http.version = Config.mainApiVersion;
    return this.http.getWithoutLogin(this.bannerUrl, Object.assign({}, params));
  }

  /**
   *  1.4.1 版本
   * 获取热门课堂列表
   * @param {Object} params
   * @return {Observable<any>}
   */
  getHotLivesList(obj?, params?: Object) {
    this.http.version = Config.mainApiVersion;
    return this.http.getWithoutLogin(this.hotLivesUrl, Object.assign({}, params, obj));
  }

  /**
   * 1.4.1 版本
   *  获取课堂信息
   * @param id
   * @param {Object} params
   * @return {Observable<any>}
   */
  getHotLivesInfo(id, params?: Object) {
    this.http.version = Config.mainApiVersion;
    return this.http.getWithoutLogin(`${this.hotLivesUrl}/${id}`, Object.assign({ expand: 'index_list' }, params));
  }

  /**
   *  1.4.1 版本
   * 获取连载列表
   * @param obj
   * @param {Object} params
   * @return {Observable<any>}
   */
  getSerialList(obj, params?: Object) {
    this.http.version = Config.mainApiVersion;
    return this.http.getWithoutLogin(this.serialUrl, Object.assign({}, params, obj));
  }

  /**
   * 获取连载信息
   * @param id
   * @param {Object} params
   * @return {Observable<any>}
   */
  getSerialInfo(id, params?: Object) {
    this.http.version = Config.mainApiVersion;
    return this.http.getWithoutLogin(`${this.serialUrl}/${id}`, Object.assign({ expand: 'latest_update,media_author' }, params));
  }

  /**
   * 获取连载数量
   * @param {Object} params
   * @return {Observable<any>}
   */
  getSerialNum(params?: Object) {
    this.http.version = Config.mainApiVersion;
    return this.http.get(this.serialCountUrl, Object.assign({}, params));
  }


  /**
   *  1.4.1 版本
   * 云课堂全局搜索
   * @param keyWords
   * @param {Object} params
   * @return {Observable<any>}
   */
  searchAllLives(keyWords, params?: Object) {
    this.http.version = Config.mainApiVersion;
    return this.http.getWithoutLogin(this.searchAllLivesUrl, Object.assign({ keyword: keyWords }, params));
  }

  /**
   *  1.4.1 版本
   *  获取我的云课堂信息
   * @param {Object} params
   * @return {Observable<any>}
   */
  getMyLivesInfo(params?: Object) {
    this.http.version = Config.mainApiVersion;
    return this.http.get(this.classInfoUrl, Object.assign({}, params));
  }

  /**
   *  1.4.1 版本
   *  设置我的云课堂信息
   * @param {Object} params
   * @return {Observable<any>}
   */
  putInfo(params) {
    this.http.version = Config.mainApiVersion;
    return this.http.put(this.classInfoUrl, params)
  }

  /**
   * 1.4.1 版本
   *  添加视频播放量
   * @param id
   * @param {Object} params
   * @return {Observable<any>}
   */
  addPlayCounts(id, params?: Object) {
    this.http.version = Config.mainApiVersion;
    return this.http.postWithoutLogin(`${this.addPvCount}/${id}`, Object.assign({}, params));
  }
}
