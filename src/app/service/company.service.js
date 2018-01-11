"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ng2_cookies_1 = require("ng2-cookies");
var main_component_1 = require("../common/base/main-component");
var config_1 = require("../config/config");
var CompanyService = (function (_super) {
    __extends(CompanyService, _super);
    function CompanyService(http, localStorage) {
        var _this = _super.call(this, http) || this;
        _this.http = http;
        _this.localStorage = localStorage;
        _this.companyUrl = '/company';
        _this.loginUrl = '/account-login';
        return _this;
    }
    // V1.3
    // public login(headers) {
    //   this.http.version = Config.mainApiVersion;
    //   return this.http.get(this.companyUrl, {'expand': 'extinfo'}, {headers: headers});
    // }
    // V1.4
    CompanyService.prototype.login = function (headers, params) {
        this.http.version = config_1.Config.mainApiBusiness;
        return this.http.post(this.loginUrl, params, { headers: headers });
    };
    CompanyService.prototype.logout = function () {
        ng2_cookies_1.Cookie.delete('currentCompanyAuthorization', '/');
        this.localStorage.removeAll();
    };
    // 获取当前公司信息
    CompanyService.prototype.getCompany = function () {
        this.http.version = config_1.Config.mainApiVersion;
        return this.http.get(this.companyUrl, { 'expand': 'extinfo,wallet' });
    };
    /**
     * 修改某个基金经理的信息
     * @param id
     * @param {Object} params
     * @returns {Observable<any>}
     */
    CompanyService.prototype.update = function (id, params) {
        return this.http.put(this.companyUrl + '/' + id, params);
    };
    return CompanyService;
}(main_component_1.MainComponent));
CompanyService = __decorate([
    core_1.Injectable()
], CompanyService);
exports.CompanyService = CompanyService;
