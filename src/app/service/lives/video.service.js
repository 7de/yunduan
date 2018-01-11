"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var config_1 = require("../../config/config");
var VideoService = (function () {
    function VideoService(http) {
        this.http = http;
        this.typeUrl = '/modify-video-type';
        this.videoAndPictureUrl = '/media';
        // private videoListUrl = '/serial';
        this.video_ListUrl = '/-serial';
        this.searchUrl = '/searchMedia';
        this.videosUrl = '/video-list';
        this.singleVideo = '/media-front-video';
        this.commentNowUrl = '/media-comment';
        this.url = '/media-videos'; // 1.4.1
        this.videoListUrl = '/media-video/my-list'; // 1.4.1
        this.mySerialUrl = '/media-info/my-list'; // 1.4.1
        this.serialTypeUrl = '/info-types'; // 1.4.1
        this.serialUrl = '/media-infos'; // 1.4.1
        this.commentsUrl = '/media-comments'; // 1.4.1
        this.bannerUrl = '/media-info/banner-list'; // 1.4.1
        this.hotLivesUrl = '/media-authors'; // 1.4.1
        this.searchAllLivesUrl = '/media/search';
        this.classInfoUrl = '/media-author/my-info';
    }
    /**
     * 获取一个视频
     * @param id
     * @param params
     * @returns {Observable<any>}
     */
    VideoService.prototype.one = function (id, params) {
        this.http.version = config_1.Config.mainApiVersion;
        return this.http.get(this.url + "/" + id, Object.assign({}, params));
    };
    /**
     * 获取所有数据
     * @param params
     * @returns {Observable<any>}
     */
    VideoService.prototype.all = function (params) {
        this.http.version = config_1.Config.mainApiVersion;
        return this.http.get(this.url, Object.assign({}, params));
    };
    /**
     * 获取视频和图片
     * @param params
     * @return {Observable<any>}
     */
    VideoService.prototype.getVideoAndPicture = function (params) {
        this.http.version = config_1.Config.mainApiVersion;
        return this.http.getWithoutLogin(this.videoAndPictureUrl, Object.assign({}, params));
    };
    /**
     * 获取非连载单个视频 前台获取
     * @param id
     * @param params
     * @return {Observable<any>}
     */
    VideoService.prototype.getSingleVideo = function (id, params) {
        this.http.version = config_1.Config.mainApiVersion;
        return this.http.getWithoutLogin(this.singleVideo + "/" + id, Object.assign({}, params));
    };
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
    VideoService.prototype.commentNow = function (id, type, content, params) {
        this.http.version = config_1.Config.mainApiVersion;
        return this.http.post(this.commentNowUrl, Object.assign({
            media_id: id,
            media_type: type,
            content: content
        }, params));
    };
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
    VideoService.prototype.get_SerialList = function (params, type, sort) {
        Object.assign(params, { type: type, sort: sort });
        this.http.version = config_1.Config.mainApiVersion;
        return this.http.getWithoutLogin(this.video_ListUrl, params);
    };
    /**
     * 大讲坛搜索
     * @param params
     * @param obj
     * @return {Observable<any>}
     */
    VideoService.prototype.getSearchResult = function (params, obj) {
        Object.assign(params, obj);
        this.http.version = config_1.Config.mainApiVersion;
        return this.http.getWithoutLogin(this.searchUrl, params);
    };
    /**
     * 删除
     * @param id
     * @returns {Observable<any>}
     */
    VideoService.prototype.deleteOne = function (id) {
        return this.http.delete(this.url + '/' + id);
    };
    VideoService.prototype.create = function (params) {
        return this.http.post(this.url, params);
    };
    VideoService.prototype.update = function (id, params) {
        return this.http.put(this.url + "/" + id, params);
    };
    /**
     * 修改视频连载
     * @param id
     * @param mediaId
     * @returns {Observable<any>}
     */
    VideoService.prototype.updateMediaId = function (id, mediaId) {
        return this.http.put(this.typeUrl, { media_id: mediaId, video_id: id });
    };
    /**
     *  1.4.1版本
     * 创建连载
     * @param obj
     * @param {Object} params
     * @return {Observable<any>}
     */
    VideoService.prototype.createSerial = function (obj, params) {
        this.http.version = config_1.Config.mainApiVersion;
        return this.http.post(this.serialUrl, Object.assign({}, params, obj));
    };
    /**
     * 1.4.1版本
     * 获取视频素材列表
     * @param status
     * @param title
     * @param {Object} params
     * @return {Observable<any>}
     */
    VideoService.prototype.getVideoList = function (status, title, params) {
        this.http.version = config_1.Config.mainApiVersion;
        return this.http.get(this.videoListUrl, Object.assign({
            expand: 'media_info',
            status: status,
            title: title
        }, params));
    };
    /**
     * 1.4.1版本
     *  删除视频素材
     * @param id
     * @param {Object} params
     * @return {Observable<any>}
     */
    VideoService.prototype.deleteVideo = function (id, params) {
        this.http.version = config_1.Config.mainApiVersion;
        return this.http.delete(this.url + "/" + id, Object.assign({}, params));
    };
    /**
     * 1.4.1版本
     * 获取我的连载
     * @param {Object} params
     * @return {Observable<any>}
     */
    VideoService.prototype.getMySerial = function (media_type, title, params) {
        this.http.version = config_1.Config.mainApiVersion;
        return this.http.get(this.mySerialUrl, Object.assign({ media_type: media_type, title: title }, params));
    };
    /**
     *  1.4.1版本
     * 获取我的连载类型
     * @param {Object} params
     * @return {Observable<any>}
     */
    VideoService.prototype.getMySerialType = function (params) {
        this.http.version = config_1.Config.mainApiVersion;
        return this.http.get(this.serialTypeUrl, Object.assign({}, params));
    };
    /**
     * 1.4.1版本
     *  删除我的连载
     * @param id
     * @param {Object} params
     * @return {Observable<any>}
     */
    VideoService.prototype.deleteMySerial = function (id, params) {
        this.http.version = config_1.Config.mainApiVersion;
        return this.http.delete(this.serialUrl + "/" + id, Object.assign({}, params));
    };
    /**
     * 1.4.1版本
     *  获取视频信息
     * @param id
     * @param {Object} params
     * @return {Observable<any>}
     */
    VideoService.prototype.getVideoInfo = function (id, params) {
        this.http.version = config_1.Config.mainApiVersion;
        return this.http.getWithoutLogin(this.url + "/" + id, Object.assign({ expand: 'media_info,media_author' }, params));
    };
    /**
     * 1.4.1 版本
     *  获取视频列表
     * @param obj
     * @param {Object} params
     * @return {Observable<any>}
     */
    VideoService.prototype.getVideosList = function (obj, params) {
        this.http.version = config_1.Config.mainApiVersion;
        return this.http.getWithoutLogin(this.url, Object.assign({}, params, obj));
    };
    /**
     *  1.4.1 版本
     * 获取评论 视频/图文
     * @param obj
     * @param {Object} params
     * @return {Observable<any>}
     */
    VideoService.prototype.getComments = function (obj, params) {
        this.http.version = config_1.Config.mainApiVersion;
        return this.http.getWithoutLogin(this.commentsUrl, Object.assign({}, params, obj));
    };
    /**
     *  1.4.1 版本
     * 添加评论
     * @param obj
     * @param {Object} params
     * @return {Observable<any>}
     */
    VideoService.prototype.addComments = function (obj, params) {
        this.http.version = config_1.Config.mainApiVersion;
        return this.http.post(this.commentsUrl, Object.assign({}, params, obj));
    };
    /**
     * 1.4.1 版本
     *  获取banner图
     * @return {Observable<any>}
     */
    VideoService.prototype.getBanner = function (params) {
        this.http.version = config_1.Config.mainApiVersion;
        return this.http.getWithoutLogin(this.bannerUrl, Object.assign({}, params));
    };
    /**
     *  1.4.1 版本
     * 获取热门课堂列表
     * @param {Object} params
     * @return {Observable<any>}
     */
    VideoService.prototype.getHotLivesList = function (params) {
        this.http.version = config_1.Config.mainApiVersion;
        return this.http.getWithoutLogin(this.hotLivesUrl, Object.assign({}, params));
    };
    /**
     * 1.4.1 版本
     *  获取课堂信息
     * @param id
     * @param {Object} params
     * @return {Observable<any>}
     */
    VideoService.prototype.getHotLivesInfo = function (id, params) {
        this.http.version = config_1.Config.mainApiVersion;
        return this.http.getWithoutLogin(this.hotLivesUrl + "/" + id, Object.assign({ expand: 'index_list' }, params));
    };
    /**
     *  1.4.1 版本
     * 获取连载列表
     * @param obj
     * @param {Object} params
     * @return {Observable<any>}
     */
    VideoService.prototype.getSerialList = function (obj, params) {
        this.http.version = config_1.Config.mainApiVersion;
        return this.http.getWithoutLogin(this.serialUrl, Object.assign({}, params, obj));
    };
    /**
     *  1.4.1 版本
     * 云课堂全局搜索
     * @param keyWords
     * @param {Object} params
     * @return {Observable<any>}
     */
    VideoService.prototype.searchAllLives = function (keyWords, params) {
        this.http.version = config_1.Config.mainApiVersion;
        return this.http.getWithoutLogin(this.searchAllLivesUrl, Object.assign({ keyword: keyWords }, params));
    };
    /**
     *  1.4.1 版本
     *  获取我的云课堂信息
     * @param {Object} params
     * @return {Observable<any>}
     */
    VideoService.prototype.getMyLivesInfo = function (params) {
        this.http.version = config_1.Config.mainApiVersion;
        return this.http.get(this.classInfoUrl, Object.assign({}, params));
    };
    return VideoService;
}());
VideoService = __decorate([
    core_1.Injectable()
], VideoService);
exports.VideoService = VideoService;
