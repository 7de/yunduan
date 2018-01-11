"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var config_1 = require("../config/config");
var ng2_cookies_1 = require("ng2-cookies");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/operator/finally");
require("rxjs/add/observable/throw");
var HttpClientService = (function () {
    function HttpClientService(loaderService, http, router, flashMessages) {
        this.loaderService = loaderService;
        this.http = http;
        this.router = router;
        this.flashMessages = flashMessages;
    }
    /**
     * 不用登录的 get 请求
     * @param {string} url
     * @param params
     * @param reqOpts
     * @returns {Observable<any>}
     */
    HttpClientService.prototype.getWithoutLogin = function (url, params, reqOpts) {
        var headers = new http_1.Headers();
        return this.request(url, Object.assign({
            method: 'get',
            params: params,
            headers: headers,
            withCredentials: true
        }, reqOpts));
    };
    /**
     * 不用登录的post请求
     * @param {string} url
     * @param params
     * @param reqOpts
     * @return {Observable<any>}
     */
    HttpClientService.prototype.postWithoutLogin = function (url, params, reqOpts) {
        var headers = new http_1.Headers();
        return this.request(url, Object.assign({
            method: 'post',
            params: params,
            headers: headers,
            withCredentials: true
        }, reqOpts));
    };
    /**
     * 登录了商品浏览记录
     *
     * @param {string} url
     * @param headers
     * @param params
     * @param reqOpts
     * @returns {Observable<any>}
     */
    HttpClientService.prototype.getGoodsWithoutLogin = function (url, headers, params, reqOpts) {
        return this.request(url, Object.assign({
            method: 'get',
            params: params,
            headers: headers,
            withCredentials: true
        }, reqOpts));
    };
    /**
     * get 请求
     * @param {string} url
     * @param params
     * @param reqOpts
     * @returns {Observable<any>}
     */
    HttpClientService.prototype.get = function (url, params, reqOpts) {
        return this.request(url, Object.assign({ method: 'get', params: params }, reqOpts));
    };
    HttpClientService.prototype.post = function (url, data, reqOpts) {
        return this.request(url, Object.assign({ method: 'post', body: data }, reqOpts));
    };
    HttpClientService.prototype.put = function (url, data, reqOpts) {
        return this.request(url, Object.assign({ method: 'put', body: data }, reqOpts));
    };
    HttpClientService.prototype.delete = function (url, params, reqOpts) {
        return this.request(url, Object.assign({ method: 'delete', body: params }, reqOpts));
    };
    /**
     * 导出 excel
     * @param {string} url
     * @param params
     * @returns {Observable<Blob>}
     */
    HttpClientService.prototype.exportExcel = function (url, params) {
        var newReqOpts = Object.assign({
            method: 'get',
            params: params,
            headers: this.createAuthorizationHeader(),
            responseType: http_1.ResponseContentType.Blob
        });
        return this.http.request(this.getFullUrl(url), new http_1.RequestOptions(newReqOpts))
            .map(function (res) { return new Blob([res.json()], { type: 'application/vnd.ms-excel' }); });
    };
    /**
     * 上传单个文件
     * @param url
     * @param file
     * @param reqOpts
     * @returns {Observable<any>}
     */
    HttpClientService.prototype.uploadFile = function (url, file, reqOpts) {
        var formData = new FormData();
        formData.append('file', file, file.name);
        return this.request(url, Object.assign({ method: 'post', body: formData }, reqOpts));
    };
    /**
     * 请求
     * @param {string} url
     * @param {RequestOptions} reqOpts
     * @returns {Observable<any>}
     */
    HttpClientService.prototype.request = function (url, reqOpts) {
        var _this = this;
        var headers = reqOpts.headers || this.createAuthorizationHeader();
        var newReqOpts = Object.assign({ headers: headers }, reqOpts);
        this.requestInterceptor(); // 拦截请求
        var fullUrl = this.getFullUrl(url); // 获取整个请求的地址
        return this.http.request(fullUrl, new http_1.RequestOptions(newReqOpts))
            .map(function (res) { return res.json(); })
            .map(this.preprocessRes.bind(this)) // 对返回数据进行统一预处理
            .catch(this.handleErr.bind(this)) // 对请求错误统一处理
            .finally(function () {
            _this.onFinally(); // 动画操作
        });
    };
    /**
     * Build full URL for request.
     * @param str
     * @returns {string}
     */
    HttpClientService.prototype.getFullUrl = function (str) {
        return config_1.Config.apiDomain + this.version + str;
    };
    /**
     * 拦截请求
     */
    HttpClientService.prototype.requestInterceptor = function () {
        // this.loaderService.showLoading(); // 开启加载动画
    };
    /**
     * 关闭加载动画
     */
    HttpClientService.prototype.responseInterceptor = function () {
        this.loaderService.hideLoading();
    };
    /**
     * 最后
     */
    HttpClientService.prototype.onFinally = function () {
        this.responseInterceptor();
    };
    HttpClientService.prototype.handleErr = function (error) {
        var errMsg;
        if (error.status === 401) {
            errMsg = '账号或密码错误，请重输入';
        }
        else {
            var body = JSON.parse(error._body);
            if (body.code !== 44001) {
                errMsg = (body.message) ? body.message : 'Server error';
            }
        }
        return errMsg ? Observable_1.Observable.throw(errMsg) : null;
    };
    HttpClientService.prototype.preprocessRes = function (res) {
        return res.data;
    };
    HttpClientService.prototype.createAuthorizationHeader = function () {
        var headers = new http_1.Headers();
        var authorization = ng2_cookies_1.Cookie.get('currentCompanyAuthorization');
        if (!authorization) {
            // ;('登录过期，请重新登录');
            this.router.navigateByUrl('/login/user-login');
        }
        headers.append('Authorization', authorization);
        headers.append('Accept', 'application/json');
        // headers.append('Content-Type', 'application/json; charset=utf-8');
        return headers;
    };
    return HttpClientService;
}());
HttpClientService = __decorate([
    core_1.Injectable()
], HttpClientService);
exports.HttpClientService = HttpClientService;
