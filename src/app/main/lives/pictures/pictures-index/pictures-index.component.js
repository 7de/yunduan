"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var PicturesIndexComponent = (function () {
    function PicturesIndexComponent(pictureService, route, router) {
        this.pictureService = pictureService;
        this.route = route;
        this.router = router;
        this.id = this.route.snapshot.queryParams['id'] || '46'; // 测试数据
        this.media_id = this.route.snapshot.queryParams['media_id'] || '51'; // 测试数据
    }
    PicturesIndexComponent.prototype.ngOnInit = function () {
        this.getPictureInfo();
        this.load();
    };
    PicturesIndexComponent.prototype.load = function () {
        var _this = this;
        this.route.queryParams.subscribe(function (params) {
            _this.params = Object.assign({
                page: params['page'],
                pageSize: 5
            });
            _this.getPictureList();
        });
    };
    ;
    /**
     * 获取图文信息
     */
    PicturesIndexComponent.prototype.getPictureInfo = function () {
        var _this = this;
        this.pictureService.getSerialInfo(this.id).subscribe(function (res) {
            _this.singleData = res;
            _this.getPictureList();
        });
    };
    /**
     * 获取图文列表
     * @param id
     */
    PicturesIndexComponent.prototype.getPictureList = function () {
        var _this = this;
        var obj = { media_id: this.media_id, expand: 'media_info' };
        Object.assign(obj, this.params);
        this.pictureService.getPicList(obj).subscribe(function (res) {
            _this.picturesList = res['items'];
            _this.pagination = res['_meta'];
        });
    };
    /**
     * 分页操作数据
     * @param e
     */
    PicturesIndexComponent.prototype.paginate = function (e) {
        this.router.navigate([this.router.url.split('?')[0]], {
            queryParams: {
                page: e.page + 1,
            },
            queryParamsHandling: 'merge'
        });
    };
    return PicturesIndexComponent;
}());
PicturesIndexComponent = __decorate([
    core_1.Component({
        selector: 'app-pictures-index',
        templateUrl: './pictures-index.component.html',
        styleUrls: [
            '../pictures.scss',
            './pictures-index.component.scss'
        ]
    })
], PicturesIndexComponent);
exports.PicturesIndexComponent = PicturesIndexComponent;
