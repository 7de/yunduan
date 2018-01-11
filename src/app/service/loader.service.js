"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var LoaderService = LoaderService_1 = (function () {
    function LoaderService() {
    }
    LoaderService.prototype.getLoaderCount = function () {
        return LoaderService_1.loadingCount;
    };
    LoaderService.prototype.showLoading = function () {
        LoaderService_1.loadingCount++;
    };
    LoaderService.prototype.hideLoading = function () {
        LoaderService_1.loadingCount--;
    };
    return LoaderService;
}());
LoaderService.loadingCount = 0;
LoaderService = LoaderService_1 = __decorate([
    core_1.Injectable()
], LoaderService);
exports.LoaderService = LoaderService;
var LoaderService_1;
