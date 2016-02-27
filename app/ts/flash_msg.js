/// <reference path="../typings/jquery.d.ts" />
/// <reference path="../typings/bootstrap.d.ts" />
/// <reference path="interfaces.ts" />
/// <reference path="LiteEvent.ts" />
define(["require", "exports", "jquery"], function (require, exports, $) {
    var __UPDATED__ = '2016.02.10';
    var __VERSION__ = "1.6.0";
    var __AUTHOR__ = 'David Trillo';
    var __WEBSITE__ = '';
    var Flash_msgbox = (function () {
        function Flash_msgbox(div, defaultclass) {
            if (defaultclass === void 0) { defaultclass = "alert-warning"; }
            this.extraclass = "";
            this.extraclassdefault = '';
            this.set_div_alert(div, defaultclass);
        }
        // DIV alert - Version 1.6.0
        Flash_msgbox.prototype.set_div_alert = function (div, defaultclass) {
            var _this = this;
            if (defaultclass === void 0) { defaultclass = "alert-warning"; }
            this._div_alert = $(div);
            this.div_alert_stop();
            this._div_alert.removeClass('hide'); // 1.4.5
            this.extraclassdefault = defaultclass;
            this._div_alert.find('.alert').addClass(this.extraclassdefault);
            this._div_alert.on('click', function (e) { _this.div_alert_stop(); });
        };
        Flash_msgbox.prototype.div_alert = function (opc) {
            var that = this;
            if (opc["clase"] == undefined) {
                opc.clase = "";
            }
            if (opc["tiempo"] == undefined) {
                opc.tiempo = 0;
            }
            if (opc.clase.length > 0) {
                that.extraclass = opc.clase;
                that._div_alert.find('.alert').removeClass(that.extraclassdefault).addClass(that.extraclass);
            }
            that._div_alert.show();
            that._div_alert_close_btn = that._div_alert.find('button');
            var _msg = that._div_alert.find('#mensaje');
            _msg.html(opc.mensaje);
            if (opc.tiempo > 0) {
                setTimeout(function () { that.div_alert_stop(); }, opc.tiempo);
            }
            that._div_alert_close_btn.on('click', function (e) { that.div_alert_stop(); }); // 1.4.6
        };
        Flash_msgbox.prototype.div_alert_stop = function () {
            var that = this;
            this._div_alert.hide(); // 1.4.6
            if (this.extraclass.length > 0) {
                that._div_alert.find('.alert').removeClass(that.extraclass).addClass(that.extraclassdefault);
                this.extraclass = "";
            }
        };
        return Flash_msgbox;
    })();
    return Flash_msgbox;
});
//# sourceMappingURL=flash_msg.js.map