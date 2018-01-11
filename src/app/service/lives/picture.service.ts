import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { Config } from '../../config/config';

@Injectable()
export class PictureService {

  private serializePicUrl = '/media-article';
  private picturesListUrl = '/media-article-list';
  private pictureDetailUrl = '/media-articles'; // 1.4.1
  private pictureSerialUrl = '/media-infos'; // 1.4.1
  private serialListUrl = '/media-info/my-list' // 1.4.1
  private serialGraphicUrl = '/media-article/my-list'; // 1.4.1
  private livesUrl = '/media-author/my-info'; // 1.4.1
  private picturesNumUrl = '/media-article/my-count'; // 1.4.1
  private pvCountUrl = '/media-article/insert-pv'; // 1.4.1

  constructor(protected http: HttpClientService) {
  }

  /**
   * 获取图片头部信息
   * @param id
   * @param params
   * @return {Observable<any>}
   */
  getSerializePictureInfo(id, params?) {
    this.http.version = Config.mainApiVersion;
    return this.http.getWithoutLogin(`${this.serializePicUrl}/${id}`, Object.assign({}, params));
  }

  /**
   * 获取图片连载目录
   * @param id
   * @param params
   * @return {Observable<any>}
   */
  getPictureList(id, params?) {
    this.http.version = Config.mainApiVersion;
    return this.http.getWithoutLogin(`${this.picturesListUrl}/${id}`, Object.assign({}, params));
  }

  /**
   * 获取图文详情
   * @param id
   * @param params
   * @return {Observable<any>}
   */
  getPictureDetail(id, params?) {
    this.http.version = Config.mainApiVersion;
    return this.http.getWithoutLogin(`${this.pictureDetailUrl}/${id}`, Object.assign({}, params));
  }

  /**
   * 1.4.1版本
   *  获取单个图文信息
   * @param id
   * @param params
   * @return {Observable<any>}
   */
  getSinglePicInfo(id, params?) {
    this.http.version = Config.mainApiVersion;
    return this.http.get(`${this.pictureDetailUrl}/${id}`, Object.assign({ expand: 'content,media_info' }, params));
  }

  /**
   * 1.4.1版本
   *  获取视频/图文连载信息
   * @param id
   * @param params
   * @return {Observable<any>}
   */
  getSerialInfo(id, params?) {
    this.http.version = Config.mainApiVersion;
    return this.http.getWithoutLogin(`${this.pictureSerialUrl}/${id}`, Object.assign({ expand: 'latest_update,media_author' }, params));
  }

  /**
   * 1.4.1版本
   * 获取图文列表
   * @param obj
   * @param params
   * @return {Observable<any>}
   */
  getPicList(params?: Object) {
    this.http.version = Config.mainApiVersion;
    return this.http.getWithoutLogin(this.pictureDetailUrl, params);
  }

  /**
   * 1.4.1版本
   *  创建图文
   * @param obj
   * @param {Object} params
   * @return {Observable<any>}
   */
  createPictures(obj, params?: Object) {
    this.http.version = Config.mainApiVersion;
    return this.http.post(this.pictureDetailUrl, Object.assign({}, params, obj));
  }

  /**
   * 获取图文/视频列表
   * @param media_type
   * @param {Object} params
   * @return {Observable<any>}
   */
  getSeriaList(media_type, params?: Object) {
    this.http.version = Config.mainApiVersion;
    return this.http.get(this.serialListUrl, Object.assign({ media_type: media_type }, params));
  }

  /**
   * 1.4.1版本
   *  获取图文素材列表
   * @return {Observable<any>}
   */
  getGraphicList(params = {}) {
    this.http.version = Config.mainApiVersion;
    return this.http.get(this.serialGraphicUrl, params);
  }

  /**
   *  1.4.1版本
   * 获取图文素材数量
   * @param {Object} params
   * @return {Observable<any>}
   */
  getPicturesMaterialNum(params?: Object) {
    this.http.version = Config.mainApiVersion;
    return this.http.get(this.picturesNumUrl, Object.assign({}, params));
  }

  /**
   *  1.4.1版本
   *  删除图文
   * @param id
   * @param {Object} params
   * @return {Observable<any>}
   */
  deleteGraphic(id, params?: Object) {
    this.http.version = Config.mainApiVersion;
    return this.http.delete(`${this.pictureDetailUrl}/${id}`, Object.assign({}, params));
  }

  /**
   * 1.4.1版本
   * 获取云课堂信息
   * @param {Object} params
   * @return {Observable<any>}
   */
  getLivesInfo(params?: Object) {
    this.http.version = Config.mainApiVersion;
    return this.http.get(this.livesUrl, Object.assign({}, params));
  }

  /**
   * 1.4.1 版本
   *  获取图文语音列表页
   * @param sort
   * @param info_type
   * @param {Object} params
   * @return {Observable<any>}
   */
  getPicturesList(sort?, info_type?, params?: Object) {
    this.http.version = Config.mainApiVersion;
    return this.http.getWithoutLogin(this.pictureDetailUrl, Object.assign({ sort: sort, info_type: info_type, expand: 'media_info' }, params));
  }

  /**
   * 1.4.1 版本
   * 课堂信息获取
   * @param id
   * @param { Object } param
   * @return {Observable<any>}
   */
  getMediaAuthor(id, params?: Object) {
    this.http.version = 'v1';
    return this.http.getWithoutLogin(`/media-authors/${id}`, params)
  }

  /**
   *  1.4.1 版本
   * 获取上传协议
   * @param {Object} params
   * @return {Observable<any>}
   */
  getUploadProtocol(params?: Object) {
    this.http.version = 'v1';
    return this.http.getWithoutLogin(`/protocols/11` ,params);
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
    return this.http.postWithoutLogin(`${this.pvCountUrl}/${id}`, Object.assign({}, params));
  }
}
