"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var FlashMessagesService = (function () {
    function FlashMessagesService() {
        this.message = [];
        this.msg = [];
    }
    FlashMessagesService.prototype.success = function (detail, summary) {
        this.message.push({
            severity: 'success', summary: summary, detail: detail
        });
    };
    FlashMessagesService.prototype.info = function (detail, summary) {
        this.message.push({
            severity: 'info', summary: summary, detail: detail
        });
    };
    FlashMessagesService.prototype.warning = function (detail, summary) {
        this.message.push({
            severity: 'warn', summary: summary, detail: detail
        });
    };
    FlashMessagesService.prototype.error = function (detail, summary) {
        this.message.push({
            severity: 'error', summary: summary, detail: detail
        });
    };
    FlashMessagesService.prototype.wechattip = function (detail, summary) {
        this.msg = [];
        this.msg.push({
            severity: 'warn', summary: summary, detail: detail
        });
    };
    FlashMessagesService.prototype.wechatsuc = function (detail, summary) {
        this.msg = [];
        this.msg.push({
            severity: 'success', summary: summary, detail: detail
        });
    };
    FlashMessagesService.prototype.wechaterr = function (detail, summary) {
        this.msg = [];
        this.msg.push({
            severity: 'error', summary: summary, detail: detail
        });
    };
    FlashMessagesService.prototype.wechatprompt = function (detail, summary) {
        this.msg = [];
        this.msg.push({
            severity: 'info', summary: summary, detail: detail
        });
    };
    return FlashMessagesService;
}());
FlashMessagesService = __decorate([
    core_1.Injectable()
], FlashMessagesService);
exports.FlashMessagesService = FlashMessagesService;
