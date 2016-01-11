/// <reference path="../typings/jquery.d.ts" />
/// <reference path="../typings/bootstrap.d.ts" />
/// <reference path="interfaces.ts" />
define(["require", "exports", "jquery", "msgbox"], function (require, exports, $, MsgBox) {
    var __UPDATED__ = '2015.11.13';
    var __VERSION__ = "1.2.0";
    var __AUTHOR__ = 'David Trillo';
    var __WEBSITE__ = '';
    var opciones_app = {
        base: '#contenedor'
    };
    var MenuApp = (function () {
        function MenuApp() {
            this.debug = false;
            this.div_base = $(opciones_app.base);
            this.msg = new MsgBox();
            this.msg.set_div_alert("#flash");
            this.refresca();
            console.log('Plantilla cargada con exito!');
        }
        MenuApp.prototype.test = function (msg) {
            msg = msg || '';
            console.log('Test ' + msg);
        };
        MenuApp.prototype.refresca = function () {
            var _this = this;
            var that = this;
            // Flash
            that.div_base.find('#btn_flash').on('click', function (e) {
                e.preventDefault();
                that.msg.div_alert('Ejemplo Flash', 5000);
                console.log(_this);
                console.log(that);
            });
            // Simple Click
            this.div_base.find('#simple').on('click', function (e) {
                e.preventDefault();
                var opc = {
                    titulo: 'Test',
                    mensaje: 'Esto es una prueba',
                    txt_boton_cerrar: 'Cerrar',
                    btn_class: 'btn-default',
                    modal_header_class: 'modal-header-success',
                    boton_cerrar: true,
                    funcion_click_cerrar: that.test
                };
                that.msg.show_alert(opc);
                that.msg.AlertOK.on(function (bln) { that.test('Simple'); });
            });
            this.div_base.find('#timer5sec').on('click', function (e) {
                e.preventDefault();
                var opc = {
                    titulo: 'Test',
                    mensaje: 'Esto es una prueba de solo 5 segundos',
                    btn_class: 'btn-info',
                    boton_cerrar: true,
                    timer: 5000
                };
                that.msg.show_alert(opc);
                that.msg.AlertOK.on(function (bln) { that.test(' 5 seconds Simple'); });
            });
            this.div_base.find('#yesno').on('click', function (e) {
                e.preventDefault();
                var opc = {
                    titulo: 'Test para MsgBox Si-No-Cancel',
                    mensaje: 'Venga, pulsa un botón',
                    txt_boton_yes: 'Si',
                    txt_boton_no: 'Noooo',
                    txt_boton_cancel: 'Cancelando',
                    boton_cancel: true,
                    boton_cerrar: true,
                    cancel_btn_class: 'btn-danger',
                    yes_btn_class: 'btn-primary',
                    no_btn_class: 'btn-primary',
                    funcion_click_yes: that.test,
                    funcion_click_no: that.test,
                    funcion_click_cancel: that.test
                };
                that.msg.show_yesno(opc);
                that.msg.YesNoCancel.on(function (cadena) {
                    console.log('Pulsado ...: ' + cadena);
                });
            });
            // Ejemplo Login
            this.div_base.find('#login').on('click', function (e) {
                e.preventDefault();
                var opc = {
                    titulo: 'Test',
                    mensaje: 'Esto es una prueba de solo 5 segundos'
                };
                that.msg.LoggedIn.on(function (cadena) {
                    console.log('cadena: ' + cadena);
                });
                that.msg.show_login(opc);
            });
            // Ejemplo Cambia Pass
            this.div_base.find('#cambiapass').on('click', function (e) {
                e.preventDefault();
                var no_pass = {
                    titulo: 'Error en modificación de contraseña',
                    mensaje: 'Error en modificación de contraseña',
                    btn_class: 'btn-danger',
                    timer: 10000,
                    boton_cerrar: true
                };
                var opc = {
                    titulo: 'Test',
                    mensaje: 'Cambiar Password',
                    btn_class: 'btn-danger',
                    boton_cerrar: true,
                    alert_change_password_error: no_pass
                };
                that.msg.show_cambiapass(opc);
                that.msg.PassChanged.on(function (cadena) {
                    console.log('Cambia passw: ' + cadena);
                });
            });
        };
        return MenuApp;
    })();
    return MenuApp;
});
//# sourceMappingURL=menu.js.map