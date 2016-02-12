/// <reference path="../typings/jquery.d.ts" />
/// <reference path="../typings/bootstrap.d.ts" />
/// <reference path="interfaces.ts" />
/// <reference path="msgbox_interfaces.ts" />

var __UPDATED__ = '2016.02.02';
var __VERSION__ = "1.4.0";
var __AUTHOR__ = 'David Trillo';
var __WEBSITE__ = '';

import $ = require("jquery");
import MsgBox = require("msgbox");

var opciones_app = {
    base: '#contenedor'
}


class MenuApp {
    private debug: boolean = false;
    private msg: MsgBox;
    private div_base: JQuery;
    
    constructor() {
        this.div_base = $(opciones_app.base);
        this.msg = new MsgBox();
        this.msg.set_div_alert("#flash");
        this.refresca();
        console.log('Plantilla cargada con exito!');
    }

    test(msg?: string) {
    	msg = msg || '';
    	console.log('Test ' + msg);
    }
    
	refresca() {
		var that = this;
		// Flash
		that.div_base.find('#btn_flash').on('click', (e) => {
        	e.preventDefault();
        	var data: IDivAlert = {
        		mensaje: 'Ejemplo Flash',
        		tiempo: 5000
        	}
        	that.msg.div_alert(data);
        	console.log(this);
        	console.log(that);
		})
		
		// Simple Click
		that.div_base.find('#simple').on('click', (e) => {
        	e.preventDefault();
        	var opc: IAlert = { 
        		titulo: 'Test',
        		mensaje: 'Esto es una prueba',
        		txt_boton_cerrar: 'Cerrar',
        		btn_class: 'btn-default',
        		modal_header_class: 'modal-header-success',
        		boton_cerrar: true,
        		funcion_click_cerrar: that.test
        	}
        	that.msg.show_alert(opc);
        	that.msg.AlertOK.on((bln) => { that.test('Simple'); });
        });
        
        that.div_base.find('#timer5sec').on('click', (e) => {
        	e.preventDefault();
        	var opc: IAlert = { // IAlert
        		titulo: 'Test',
        		mensaje: 'Esto es una prueba de solo 5 segundos',
        		btn_class: 'btn-info',
        		boton_cerrar: true,
        		timer: 5000
        	}
        	that.msg.show_alert(opc);
        	that.msg.AlertOK.on((bln) => { that.test(' 5 seconds Simple'); });
        });
        
        that.div_base.find('#yesno').on('click', (e) => {
        	e.preventDefault();
        	var opc: IYesNoCancel = { 
        		titulo: 'Test para MsgBox Si-No-Cancel',
        		mensaje: 'Venga, pulsa un botón',
        		txt_boton_yes: 'Si',
        		txt_boton_no: 'Noooo',
        		txt_boton_cancel: 'Cancelando',
        		boton_cancel: true,
        		boton_cerrar: true,
        		cancel_btn_class: 'btn-danger',
        		yes_btn_class: 'btn-primary',
        		no_btn_class: 'btn-primary'
        	}
        	that.msg.show_yesno(opc);
        	that.msg.YesNoCancel.on((btn: EMsgBox) => { // 1.4.3
        		var valor: string;
        		switch(btn) {
				    case 1: // NO
				    	valor = "NO";
				        break;
				    case 2: // Cancel
				        valor = "CANCEL";
				        break;
				    default: // Yes
		        		valor = "SI";
				} 
				console.log('Pulsado ...: ' + valor);
        	})
        });
        
        // Ejemplo Login
        that.div_base.find('#login').on('click', (e) => {
        	e.preventDefault();
        	var login_data: ILogin = {
    			modal_header_class: 'modal-header-success',
        		titulo: 'Acceso a TEST',
        		usuario: '',
        		btn_entrar_class: 'btn-primary',
        		btn_cerrar_class: 'btn-default'
        	}
        	that.msg.LoggedIn.on(
        		(data) => {
        		// console.log(data);
        		var opc: IAlert = { 
	        		titulo: 'Test',
	        		mensaje: 'Usuario: ' + data["user"],
	        		txt_boton_cerrar: 'Cerrar',
	        		btn_class: 'btn-default',
	        		modal_header_class: 'modal-header-success',
	        		boton_cerrar: true,
	        		funcion_click_cerrar: that.test
        		}
        		that.msg.show_alert(opc); 
        		//
        		/* var alerta: IDivAlert = {
	        		mensaje: 'Ejemplo Flash',
	        		tiempo: 5000,
	        		clase: 'alert-danger'
	        	}
        		that.msg.div_alert(alerta); */
        	});
        	that.msg.show_login(login_data);
        });
        
        // Ejemplo Cambia Pass
        that.div_base.find('#cambiapass').on('click', (e) => {
        	e.preventDefault();
        	var no_pass: IAlert = {
        		titulo: 'Error en modificación de contraseña',
        		mensaje: 'Error en modificación de contraseña',
        		btn_class: 'btn-danger',
        		timer: 10000,
        		boton_cerrar: true
        	}
        	var opc: ICambiaPass = { // IAlert
        		titulo: 'Test',
        		mensaje: 'Cambiar Password',
        		btn_class: 'btn-danger',
        		boton_cerrar: true,
        		alert_change_password_error: no_pass,
        		btn_volver_class: 'btn-default',
        		btn_cambiar_class: 'btn-success'
        	}
        	that.msg.show_cambiapass(opc);
        	that.msg.PassChanged.on((cadena) => {
        		console.log('Cambia passw: ' + cadena);
        	})
        });
	}    
}

export = MenuApp;