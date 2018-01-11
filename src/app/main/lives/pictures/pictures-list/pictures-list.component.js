"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var PicturesListComponent = (function () {
    function PicturesListComponent(pictureService, route, router) {
        this.pictureService = pictureService;
        this.route = route;
        this.router = router;
        this.tabBool = {
            'hot': true,
            'new': false
        };
        this.itemBool = {
            'hot': true,
            'raw': false,
            'finance': false,
            'invest': false,
            'other': false
        };
        this.sort = '-pv'; // -pv:最火 -public_tiem:最近更新
        this.info_type = this.route.snapshot.queryParams['info_type'] || ''; // 0 财税1 法律 2 投研 3 其他
    }
    PicturesListComponent.prototype.ngOnInit = function () {
        if (this.info_type) {
            switch (this.info_type) {
                case '0':
                    this.boolChangeFun('finance');
                    break;
                case '1':
                    this.boolChangeFun('raw');
                    break;
                case '2':
                    this.boolChangeFun('invest');
                    break;
                case '3':
                    this.boolChangeFun('other');
                    break;
                default:
                    this.boolChangeFun('hot');
                    break;
            }
        }
        this.load();
    };
    PicturesListComponent.prototype.boolChangeFun = function (type) {
        for (var key in this.itemBool) {
            if (key === type) {
                this.itemBool[key] = true;
            }
            else {
                this.itemBool[key] = false;
            }
        }
    };
    PicturesListComponent.prototype.switchType = function (type) {
        switch (type) {
            case 'hot':
                this.info_type = '99'; // 99根据后台的要求
                break;
            case 'finance':
                this.info_type = '0';
                break;
            case 'raw':
                this.info_type = '1';
                break;
            case 'invest':
                this.info_type = '2';
                break;
            case 'other':
                this.info_type = '3';
                break;
            default:
                break;
        }
        this.router.navigate([this.router.url.split('?')[0]], {
            queryParams: {
                info_type: this.info_type
            },
        });
    };
    PicturesListComponent.prototype.load = function () {
        var _this = this;
        window.scrollTo(0, 0);
        this.route.queryParams.subscribe(function (params) {
            _this.params = Object.assign({
                page: params['page'],
                pageSize: 15
            });
            _this.getPictureList();
        });
    };
    ;
    /**
     * 获取图文列表
     */
    PicturesListComponent.prototype.getPictureList = function () {
        var _this = this;
        this.pictureService.getPicturesList(this.sort, this.info_type, this.params).subscribe(function (res) {
            _this.listData = res['items'];
            _this.pagination = res['_meta'];
        });
    };
    /**
     * 选择更新
     * @param status
     */
    PicturesListComponent.prototype.tabChange = function (status) {
        for (var key in this.tabBool) {
            if (key === status) {
                this.tabBool[key] = true;
            }
            else {
                this.tabBool[key] = !this.tabBool[key];
            }
        }
        this.router.navigate([this.router.url.split('?')[0]], {
            queryParams: {
                status: status
            },
            queryParamsHandling: 'merge'
        });
        switch (status) {
            case 'hot':
                this.sort = '-pv';
                break;
            case 'new':
                this.sort = '-public_time';
                break;
            default:
                break;
        }
        this.getPictureList();
    };
    /**
     * 选择种类
     * @param type
     */
    PicturesListComponent.prototype.itemSelect = function (type) {
        this.boolChangeFun(type);
        this.switchType(type);
    };
    PicturesListComponent.prototype.linkToIndex = function (id) {
        this.router.navigate(['/lives/pictures-index', id]);
        return false;
    };
    /**
     * 分页操作数据
     * @param e
     */
    PicturesListComponent.prototype.paginate = function (e) {
        this.router.navigate([this.router.url.split('?')[0]], {
            queryParams: {
                page: e.page + 1,
            },
            queryParamsHandling: 'merge'
        });
    };
    return PicturesListComponent;
}());
PicturesListComponent = __decorate([
    core_1.Component({
        selector: 'app-pictures-list',
        templateUrl: './pictures-list.component.html',
        styleUrls: ['./pictures-list.component.scss']
    })
], PicturesListComponent);
exports.PicturesListComponent = PicturesListComponent;
