"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var config_1 = require("#{config}/config");
var UploadPicturesComponent = (function () {
    function UploadPicturesComponent(formBuilder, flashMessages, pictureService) {
        this.formBuilder = formBuilder;
        this.flashMessages = flashMessages;
        this.pictureService = pictureService;
        this.errors = {};
        this.umeditorConfig = config_1.Config.umeditorConfig;
    }
    UploadPicturesComponent.prototype.ngOnInit = function () {
        this.picturesForm = this.formBuilder.group({
            'picturesTitle': ['', [forms_1.Validators.required]],
            'pictureIntro': ['', [forms_1.Validators.required]],
            'editFile': ['', [forms_1.Validators.required]]
        });
    };
    /**
     * 获取图文列表
     */
    UploadPicturesComponent.prototype.getPicturesList = function () {
        var _this = this;
        this.pictureService.getSeriaList('1').subscribe(function (res) {
            // console.log(res);
            _this.serialItem = res['items'];
        });
    };
    UploadPicturesComponent.prototype.onSubmit = function (form) {
        var _this = this;
        if (!form.valid || !this.imgSrc || !this.selectObj) {
            this.errors['img'] = !Boolean(this.imgSrc);
            this.errors['selectObj'] = !Boolean(this.selectObj);
            return false;
        }
        if (!this.selectBool) {
            this.flashMessages.wechatprompt('请勾选云端互联网上传服务条款');
            return false;
        }
        var obj = {
            'media_id': 151,
            'title': form.value.picturesTitle,
            'description': form.value.pictureIntro,
            'img': this.imgSrc,
            'content': form.value.editFile
        };
        this.pictureService.createPictures(obj).subscribe(function (res) {
            // console.log(res);
            _this.flashMessages.wechatprompt('创建图文成功');
        }, function (error) {
            _this.flashMessages.wechatprompt(error);
        });
    };
    /**
     * 上传图片
     */
    UploadPicturesComponent.prototype.returnRes = function (event) {
        this.imgSrc = event['filename'];
    };
    /**
     * checkbox
     */
    UploadPicturesComponent.prototype.selectCheck = function (e) {
        this.selectBool = e;
    };
    return UploadPicturesComponent;
}());
UploadPicturesComponent = __decorate([
    core_1.Component({
        selector: 'app-upload-pictures',
        templateUrl: './upload-pictures.component.html',
        styleUrls: ['./upload-pictures.component.scss']
    })
], UploadPicturesComponent);
exports.UploadPicturesComponent = UploadPicturesComponent;
