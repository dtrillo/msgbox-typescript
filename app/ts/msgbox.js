/// <reference path="../typings/jquery.d.ts" />
/// <reference path="../typings/bootstrap.d.ts" />
/// <reference path="interfaces.ts" />
define(["require", "exports", "jquery", "hbs!templates/msgbox", "hbs!templates/login", "hbs!templates/cambiapass", "hbs!templates/yesno"], function (require, exports, $) {
    /// <amd-dependency path="hbs!templates/msgbox" />
    /// <amd-dependency path="hbs!templates/login" />
    /// <amd-dependency path="hbs!templates/cambiapass" />
    /// <amd-dependency path="hbs!templates/yesno" />
    var __UPDATED__ = '2015.11.13';
    var __VERSION__ = "1.1.0";
    var __AUTHOR__ = 'David Trillo';
    var __WEBSITE__ = '';
    var MsgBoxTemplate = require('hbs!templates/msgbox');
    var LoginTemplate = require('hbs!templates/login');
    var CambiaPassTemplate = require('hbs!templates/cambiapass');
    var YesNoTemplate = require('hbs!templates/yesno');
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
    var MsgBox = (function () {
        function MsgBox(div_base) {
            this._s = 'show';
            this._h = 'hide';
            this._f = 'form';
            this.onAlert = new LiteEvent();
            this.onLogin = new LiteEvent();
            this.onLogout = new LiteEvent();
            this.onChangePass = new LiteEvent();
            this.onYesNoCancel = new LiteEvent();
            if (div_base == undefined) {
                this.base = $('<div id="msgbox_container" />').appendTo('body');
            }
            else {
                this.base = $(div_base);
            }
            this.msgbox = this._creadiv('div_msgbox'); // DIV q almacena los .hbs
        }
        Object.defineProperty(MsgBox.prototype, "AlertOK", {
            get: function () { return this.onAlert; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MsgBox.prototype, "LoggedIn", {
            get: function () { return this.onLogin; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MsgBox.prototype, "LoggedOut", {
            get: function () { return this.onLogout; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MsgBox.prototype, "PassChanged", {
            get: function () { return this.onChangePass; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MsgBox.prototype, "YesNoCancel", {
            get: function () { return this.onYesNoCancel; },
            enumerable: true,
            configurable: true
        });
        // Funciones privadas
        MsgBox.prototype._creadiv = function (nombre) {
            var div = "<div id='" + nombre + "'></div>";
            this.base.append(div);
            return this.base.find('#' + nombre);
        };
        // VALIDACION para Mostrar MsgBOX
        MsgBox.prototype._valida_opciones_msgbox = function (opc) {
            if (opc.txt_boton_cerrar == undefined) {
                opc["txt_boton_cerrar"] = "Cerrar";
            }
            if (opc.boton_cerrar == undefined) {
                opc["boton_cerrar"] = true;
            }
            if (opc.timer == undefined) {
                opc["timer"] = 0;
            }
            if (opc.modal_header_class == undefined) {
                opc["modal_header_class"] = "";
            }
            return opc;
        };
        // Alert MsgBox
        MsgBox.prototype.show_alert = function (opc) {
            var div = "#msgbox";
            var that = this;
            opc = that._valida_opciones_msgbox(opc);
            var tmp = MsgBoxTemplate(opc);
            that.msgbox.html(tmp);
            var div_msg = that.msgbox.find(div);
            div_msg.modal(that._s);
            if (opc.timer > 0) {
                setTimeout(function () { div_msg.modal(that._h); }, opc.timer);
            }
            div_msg.find('#btn_login').on('click', function (e) {
                e.preventDefault();
                div_msg.modal(that._h);
                that.onAlert.trigger(true);
            });
        };
        // Login MsgBOX
        MsgBox.prototype.show_login = function (opc) {
            var div = '#form_login';
            var that = this;
            var tmp = LoginTemplate(opc);
            this.msgbox.html(tmp);
            var form = this.msgbox.find(div);
            this._clear_login(form);
            form.modal(that._s);
            form.find('#btn_login').on('click', function (e) {
                e.preventDefault();
                form.modal(that._h);
                if (that._valida_login(form)) {
                    var cadena = form.find(that._f).serialize();
                    that.onLogin.trigger(cadena);
                }
                else {
                    console.log('Sin datos para Login');
                }
            });
        };
        MsgBox.prototype._valida_login = function (form) {
            var campos = ["user", "password"];
            var tmp = '';
            var valores = [];
            var devuelve_cero = false;
            for (var i = 0; i < campos.length; ++i) {
                tmp = form.find('#' + campos[i]).val();
                if (tmp.length == 0) {
                    devuelve_cero = true;
                }
                else {
                    valores.push(tmp);
                }
            }
            return (valores.length == campos.length);
        };
        MsgBox.prototype._clear_login = function (form) {
            var inputs = form.find(':input');
            inputs.each(function (i) {
                $(i).val('');
            });
        };
        // CambiaPass MsgBox
        MsgBox.prototype.show_cambiapass = function (opc) {
            var delay = 1000;
            var that = this;
            var tmp = CambiaPassTemplate(opc);
            this.msgbox.html(tmp);
            var form = this.msgbox.find('#form_cambiapass');
            form.modal(that._s);
            form.find('#btn_login').on('click', function (e) {
                e.preventDefault();
                var subform = form.find(that._f);
                var cadena = subform.serialize();
                form.modal(that._h);
                var que = that._valida_cambiapass(subform); // Que devuelve 0 si no hace nada, 1 si es OK y 2 si hay error!
                if (que == 1) {
                    // Si todo es correcto!
                    that.onChangePass.trigger(cadena);
                }
                else if (que == 2) {
                    var aler = that._valida_opciones_msgbox(opc.alert_change_password_error);
                    setTimeout(function () { that.show_alert(aler); }, delay);
                }
            });
        };
        // Valida los datos de cambiapass
        MsgBox.prototype._valida_cambiapass = function (form) {
            var campos = ["oldpass", "newpass", "newpass2"];
            var tmp = '';
            var valores = [];
            var devuelve_cero = false;
            for (var i = 0; i < campos.length; ++i) {
                tmp = form.find('#' + campos[i]).val();
                if (tmp.length == 0) {
                    devuelve_cero = true;
                }
                valores.push(tmp);
            }
            if (devuelve_cero) {
                return 0;
            }
            var bln1 = valores[0] != valores[1];
            var bln2 = valores[2] === valores[1];
            var bln3 = (valores[1].length > 0);
            var bln4 = (valores[0].length > 0);
            // Para que sea True, debe de ocurrir que oldpass != newpass y que newpass == newpass2
            return (bln1 && bln2 && bln3 && bln4) ? 1 : 2;
        };
        // Yes-NO MsgBox
        MsgBox.prototype.show_yesno = function (opc) {
            var delay = 1000;
            var div = "#msgbox_yesnocancel";
            var that = this;
            var tmp = YesNoTemplate(opc);
            that.msgbox.html(tmp);
            var div_msg = that.msgbox.find(div);
            div_msg.modal(that._s);
            div_msg.find('#btn_yes').on('click', function (e) {
                e.preventDefault();
                div_msg.modal(that._h);
                opc.funcion_click_yes('Pulsado SI');
                setTimeout(function () { that.onYesNoCancel.trigger('yes'); ; }, delay);
            });
            div_msg.find('#btn_no').on('click', function (e) {
                e.preventDefault();
                div_msg.modal(that._h);
                opc.funcion_click_no('Pulsado NO');
                setTimeout(function () { that.onYesNoCancel.trigger('no'); ; }, delay);
            });
            div_msg.find('#btn_cancel').on('click', function (e) {
                e.preventDefault();
                div_msg.modal(that._h);
                opc.funcion_click_cancel('Pulsado CANCEL');
                setTimeout(function () { that.onYesNoCancel.trigger('cancel'); ; }, delay);
            });
        };
        return MsgBox;
    })();
    return MsgBox;
});
//# sourceMappingURL=msgbox.js.map