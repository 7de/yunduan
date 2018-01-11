"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MainComponent = (function () {
    function MainComponent(http) {
        this.http = http;
        this.http.version = MainComponent.version;
    }
    return MainComponent;
}());
MainComponent.version = 'v1';
exports.MainComponent = MainComponent;
