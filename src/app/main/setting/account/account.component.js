"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var EMAIL_URL = '/company?expand=extinfo';
var UPLOAD_URL = '/file/upload-img?fileType=image';
var AccountComponent = (function () {
    function AccountComponent(router, http, activatedRoute) {
        this.router = router;
        this.http = http;
        this.activatedRoute = activatedRoute;
        this.sysetm = [];
        this.action = false;
        this.wrong = false; // 错误
        this.actives = false; // 正确
        this.file = [];
    }
    AccountComponent.prototype.ngOnInit = function () {
        this.sysetms({});
        // this.className();
        this.scale({});
        this.className({});
    };
    /*
    * 获得账号的基本信息
    * */
    AccountComponent.prototype.sysetms = function (params) {
        var _this = this;
        Object.assign(params, { 'expand': 'extinfo' });
        this.http.get(EMAIL_URL, params).subscribe(function (result) {
            _this.result = result;
            _this.sysetm = _this.result;
            console.log(_this.result.flag);
            _this.date = _this.changeDate(_this.result.extinfo.business_reg_time);
            _this.changeDate(_this.result.extinfo.business_reg_time);
        }, function (err) {
            console.log(err);
        });
    };
    /*
    * 切换类型函数
    * */
    AccountComponent.prototype.className = function (params) {
        var _this = this;
        Object.assign(params, { 'expand': 'extinfo' });
        this.http.get(EMAIL_URL, params).subscribe(function (result) {
            _this.result = result;
            _this.sysetm = _this.result;
            console.log(_this.result.flag);
            if (_this.result.flag == true) {
                console.log(_this.actives);
                _this.actives = true;
            }
            else {
                _this.wrong = true;
            }
        }, function (err) {
            console.log(err);
        });
    };
    /*
     * 显示管理规模人数
     * */
    AccountComponent.prototype.scale = function (params) {
        var _this = this;
        Object.assign(params, { 'expand': 'extinfo' });
        this.http.get(EMAIL_URL, params).subscribe(function (result) {
            _this.result = result;
            _this.sysetm = _this.result;
            if (_this.result.extinfo.manage_scale == 0) {
                _this.scaled = "10人以下";
            }
            if (_this.result.extinfo.manage_scale == 1) {
                _this.scaled = "10-50人";
            }
            if (_this.result.extinfo.manage_scale == 2) {
                _this.scaled = "40人以上";
            }
        }, function (err) {
            console.log(err);
        });
    };
    /*
     * 时间戳转时间
     * */
    AccountComponent.prototype.changeDate = function (date) {
        if (date) {
            var simpleDate = new Date(date * 1000);
            var Y = simpleDate.getFullYear();
            var M = simpleDate.getMonth() + 1;
            var D = simpleDate.getDate();
            return Y + '-' + (M < 10 ? '0' + M : M) + '-' + (D < 10 ? '0' + D : D);
        }
    };
    /**
     * 上传图片
     */
    AccountComponent.prototype.imageUploaded = function (event) {
        this.file.push(event.file);
        console.log(this.file[0]);
    };
    AccountComponent.prototype.onSubmit = function (data) {
        var _this = this;
        /**
         * 点击上传
         */
        this.http.uploadFile(UPLOAD_URL, this.file[0]).subscribe(function (result) {
            _this.result = result;
            _this.img_path = _this.result.path;
            _this.img_src = _this.result.filename;
            console.log(_this.img_path);
            return _this.img_src;
        }, function (error) {
            console.log(error);
        });
        /*
         * 时间转时间戳
         * */
        if (this.time != null) {
            console.log(this.time);
            var str = this.time.split('-');
            var y = str[0] - 0;
            var m = str[1] - 0 - 1;
            var d = str[2] - 0;
            this.time = (new Date(y, m, d)).getTime();
            this.time = (this.time / 1000).toString();
        }
        else {
            var ste = this.date.split('-');
            var y = ste[0] - 0;
            var m = ste[1] - 0 - 1;
            var d = ste[2] - 0;
            this.time = (new Date(y, m, d)).getTime();
            this.time = (this.time / 1000).toString();
        }
        /*
         * 修改的数据值
         * */
        data = {
            'linkman': this.compellation,
            'card_num': this.idcard,
            'position': this.posts,
            'email': this.emailed,
            'company_name': this.firmname,
            'address': this.addressed,
            'manage_type': this.managertype,
            'legal_person': this.business,
            'manage_scale': this.scales,
            'reg_number': this.number,
            'license': this.img_src,
            'trade': this.involved,
            'business_reg_time': this.time
        };
        /*
        * 提交修改数据
        * */
        this.http.put(EMAIL_URL, data).subscribe(function (result) {
            _this.result = result;
            _this.sysetm = _this.result;
        }, function (err) {
            console.log(err);
        });
        this.sysetms({});
    };
    return AccountComponent;
}());
AccountComponent = __decorate([
    core_1.Component({
        selector: 'app-account',
        templateUrl: './account.component.html',
        styleUrls: ['./account.component.scss']
    })
], AccountComponent);
exports.AccountComponent = AccountComponent;
