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
var PictureService = (function () {
    function PictureService(http) {
        this.http = http;
        this.serializePicUrl = '/media-article';
        this.picturesListUrl = '/media-article-list';
        this.pictureDetailUrl = '/media-articles'; // 1.4.1
        this.pictureSerialUrl = '/media-infos'; // 1.4.1
        this.serialListUrl = '/media-info/my-list'; // 1.4.1
        this.serialGraphicUrl = '/media-article/my-list'; // 1.4.1
        this.livesUrl = '/media-author/my-info'; // 1.4.1
        this.picturesNumUrl = '/media-article/my-count'; // 1.4.1
        this.pvCountUrl = '/media-article/insert-pv'; // 1.4.1
    }
    /**
     * 获取图片头部信息
     * @param id
     * @param params
     * @return {Observable<any>}
     */
    PictureService.prototype.getSerializePictureInfo = function (id, params) {
        this.http.version = config_1.Config.mainApiVersion;
        return this.http.getWithoutLogin(this.serializePicUrl + "/" + id, Object.assign({}, params));
    };
    /**
     * 获取图片连载目录
     * @param id
     * @param params
     * @return {Observable<any>}
     */
    PictureService.prototype.getPictureList = function (id, params) {
        this.http.version = config_1.Config.mainApiVersion;
        return this.http.getWithoutLogin(this.picturesListUrl + "/" + id, Object.assign({}, params));
    };
    /**
     * 获取图文详情
     * @param id
     * @param params
     * @return {Observable<any>}
     */
    PictureService.prototype.getPictureDetail = function (id, params) {
        this.http.version = config_1.Config.mainApiVersion;
        return this.http.getWithoutLogin(this.pictureDetailUrl + "/" + id, Object.assign({}, params));
    };
    /**
     * 1.4.1版本
     *  获取单个图文信息
     * @param id
     * @param params
     * @return {Observable<any>}
     */
    PictureService.prototype.getSinglePicInfo = function (id, params) {
        this.http.version = config_1.Config.mainApiVersion;
        return this.http.get(this.pictureDetailUrl + "/" + id, Object.assign({ expand: 'content,media_info' }, params));
    };
    /**
     * 1.4.1版本
     *  获取视频/图文连载信息
     * @param id
     * @param params
     * @return {Observable<any>}
     */
    PictureService.prototype.getSerialInfo = function (id, params) {
        this.http.version = config_1.Config.mainApiVersion;
        return this.http.getWithoutLogin(this.pictureSerialUrl + "/" + id, Object.assign({ expand: 'latest_update,media_author' }, params));
    };
    /**
     * 1.4.1版本
     * 获取图文列表
     * @param obj
     * @param params
     * @return {Observable<any>}
     */
    PictureService.prototype.getPicList = function (params) {
        this.http.version = config_1.Config.mainApiVersion;
        return this.http.getWithoutLogin(this.pictureDetailUrl, params);
    };
    /**
     * 1.4.1版本
     *  创建图文
     * @param obj
     * @param {Object} params
     * @return {Observable<any>}
     */
    PictureService.prototype.createPictures = function (obj, params) {
        this.http.version = config_1.Config.mainApiVersion;
        return this.http.post(this.pictureDetailUrl, Object.assign({}, params, obj));
    };
    /**
     * 获取图文/视频列表
     * @param media_type
     * @param {Object} params
     * @return {Observable<any>}
     */
    PictureService.prototype.getSeriaList = function (media_type, params) {
        this.http.version = config_1.Config.mainApiVersion;
        return this.http.get(this.serialListUrl, Object.assign({ media_type: media_type }, params));
    };
    /**
     * 1.4.1版本
     *  获取图文素材列表
     * @return {Observable<any>}
     */
    PictureService.prototype.getGraphicList = function (params) {
        if (params === void 0) { params = {}; }
        this.http.version = config_1.Config.mainApiVersion;
        return this.http.get(this.serialGraphicUrl, params);
    };
    /**
     *  1.4.1版本
     * 获取图文素材数量
     * @param {Object} params
     * @return {Observable<any>}
     */
    PictureService.prototype.getPicturesMaterialNum = function (params) {
        this.http.version = config_1.Config.mainApiVersion;
        return this.http.get(this.picturesNumUrl, Object.assign({}, params));
    };
    /**
     *  1.4.1版本
     *  删除图文
     * @param id
     * @param {Object} params
     * @return {Observable<any>}
     */
    PictureService.prototype.deleteGraphic = function (id, params) {
        this.http.version = config_1.Config.mainApiVersion;
        return this.http.delete(this.pictureDetailUrl + "/" + id, Object.assign({}, params));
    };
    /**
     * 1.4.1版本
     * 获取云课堂信息
     * @param {Object} params
     * @return {Observable<any>}
     */
    PictureService.prototype.getLivesInfo = function (params) {
        this.http.version = config_1.Config.mainApiVersion;
        return this.http.get(this.livesUrl, Object.assign({}, params));
    };
    /**
     * 1.4.1 版本
     *  获取图文语音列表页
     * @param sort
     * @param info_type
     * @param {Object} params
     * @return {Observable<any>}
     */
    PictureService.prototype.getPicturesList = function (sort, info_type, params) {
        this.http.version = config_1.Config.mainApiVersion;
        return this.http.getWithoutLogin(this.pictureDetailUrl, Object.assign({ sort: sort, info_type: info_type, expand: 'media_info' }, params));
    };
    /**
     * 1.4.1 版本
     * 课堂信息获取
     * @param id
     * @param { Object } param
     * @return {Observable<any>}
     */
    PictureService.prototype.getMediaAuthor = function (id, params) {
        this.http.version = 'v1';
        return this.http.getWithoutLogin("/media-authors/" + id, params);
    };
    /**
     *  1.4.1 版本
     * 获取上传协议
     * @param {Object} params
     * @return {Observable<any>}
     */
    PictureService.prototype.getUploadProtocol = function (params) {
        this.http.version = 'v1';
        return this.http.getWithoutLogin("/protocols/11", params);
    };
    /**
     * 1.4.1 版本
     *  添加视频播放量
     * @param id
     * @param {Object} params
     * @return {Observable<any>}
     */
    PictureService.prototype.addPlayCounts = function (id, params) {
        this.http.version = config_1.Config.mainApiVersion;
        return this.http.postWithoutLogin(this.pvCountUrl + "/" + id, Object.assign({}, params));
    };
    return PictureService;
}());
PictureService = __decorate([
    core_1.Injectable()
], PictureService);
exports.PictureService = PictureService;
