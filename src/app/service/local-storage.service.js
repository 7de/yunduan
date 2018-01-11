"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var LocalStorageService = (function () {
    function LocalStorageService() {
        if (!localStorage) {
            throw new Error('Current browser does not support Local Storage');
        }
        this.localStorage = localStorage;
    }
    LocalStorageService.prototype.set = function (key, value) {
        this.localStorage[key] = value;
    };
    LocalStorageService.prototype.get = function (key) {
        return this.localStorage[key] || false;
    };
    LocalStorageService.prototype.setObject = function (key, value) {
        this.localStorage[key] = JSON.stringify(value);
    };
    LocalStorageService.prototype.getObject = function (key) {
        return JSON.parse(this.localStorage[key] || '{}');
    };
    LocalStorageService.prototype.remove = function (key) {
        this.localStorage.removeItem(key);
    };
    /**
     * 删除所有
     * @returns {any}
     */
    LocalStorageService.prototype.removeAll = function () {
        this.localStorage.clear();
    };
    return LocalStorageService;
}());
LocalStorageService = __decorate([
    core_1.Injectable()
], LocalStorageService);
exports.LocalStorageService = LocalStorageService;
