"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var environment_1 = require("../../environments/environment");
var Config = Config_1 = (function () {
    function Config() {
    }
    return Config;
}());
Config.apiDomain = environment_1.environment.apiDomain; // api 域名
Config.imageDomain = environment_1.environment.imageDomain; // 图片域名
Config.wechatDomain = environment_1.environment.wechatDomain; // 微信端网页域名
Config.homepageDomain = environment_1.environment.homepageDomain; // 首页域名
Config.officialDomain = environment_1.environment.officialDomain; // 正式域名
Config.pageSize = 10; // 每页显示个数
Config.mainApiVersion = 'v1';
Config.wechatApiVersion = 'wechat';
Config.mainApiBusiness = 'business';
Config.calendarLocaleCN = {
    firstDayOfWeek: 1,
    dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
    monthNames: ['一月份', '二月份', '三月份', '四月份', '五月份', '六月份', '七月份', '八月份', '九月份', '十月份', '十一月份', '十二月份'],
    monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    today: '今天',
    clear: '清空'
};
/**
 * 编辑器的配置文件
 * @type {{imageUrl: string; imageFieldName: string; imagePath: string; toolbar: [string , string , string , string , string , string]}}
 */
Config.umeditorConfig = {
    imageUrl: Config_1.apiDomain + Config_1.mainApiVersion + '/file/upload-img?fileType=image',
    imageFieldName: 'file',
    imagePath: Config_1.imageDomain,
    toolbar: [
        'undo redo | bold italic underline strikethrough | superscript subscript | forecolor backcolor | removeformat |',
        'insertorderedlist insertunorderedlist | selectall cleardoc paragraph | fontfamily fontsize',
        '| justifyleft justifycenter justifyright justifyjustify |',
        'link unlink | emotion image ',
        '| horizontal print preview fullscreen', 'drafts'
    ]
};
Config = Config_1 = __decorate([
    core_1.Injectable()
], Config);
exports.Config = Config;
var Config_1;
