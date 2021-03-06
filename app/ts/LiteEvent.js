/// <reference path="interfaces.ts" />
//  http://stackoverflow.com/questions/12881212/does-typescript-support-events-on-classes
define(["require", "exports"], function (require, exports) {
    var LiteEvent = (function () {
        function LiteEvent() {
            this.handlers = [];
        }
        LiteEvent.prototype.on = function (handler) {
            this.handlers.push(handler);
        };
        LiteEvent.prototype.off = function (handler) {
            this.handlers = this.handlers.filter(function (h) { return h !== handler; });
        };
        LiteEvent.prototype.trigger = function (data) {
            this.handlers.slice(0).forEach(function (h) { return h(data); });
        };
        return LiteEvent;
    })();
    return LiteEvent;
});
//# sourceMappingURL=LiteEvent.js.map