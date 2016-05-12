/// <reference path="../typings/jquery.d.ts" />
/// <reference path="../typings/bootstrap.d.ts" />
/// <reference path="interfaces.ts" />
/// <reference path="LiteEvent.ts" />

/// <amd-dependency path="hbs!msgbox_templates/msgbox" />
/// <amd-dependency path="hbs!msgbox_templates/login" />
/// <amd-dependency path="hbs!msgbox_templates/cambiapass" />
/// <amd-dependency path="hbs!msgbox_templates/yesno" />
/// <amd-dependency path="hbs!msgbox_templates/inputbox" />

var __UPDATED__ = '2016.04.26';
var __VERSION__ = "1.7.0";
var __AUTHOR__ = 'David Trillo';
var __WEBSITE__ = '';

// http://jschr.github.io/bootstrap-modal/
import $ = require("jquery");
import LiteEvent = require("liteevent");

var MsgBoxTemplate:Function = require('hbs!msgbox_templates/msgbox');
var InputBoxTemplate:Function = require('hbs!msgbox_templates/inputbox');
var LoginTemplate:Function = require('hbs!msgbox_templates/login');
var CambiaPassTemplate:Function = require('hbs!msgbox_templates/cambiapass');
var YesNoTemplate:Function = require('hbs!msgbox_templates/yesno');


class MsgBox {
	private _s = 'show';
	private _h = 'hide';
	private _f = 'form';
	
	private base: JQuery;
	private template:string ;
	private msgbox: JQuery;
	
	// private _div_alert: JQuery; // div_alert 1.6.0
	// private _div_alert_close_btn: JQuery;
	
	// extraclass: string = "";
	// extraclassdefault: string = '';
	
	private onAlert = new LiteEvent<boolean>();
	private onLogin = new LiteEvent<{}>();   
    private onLogout = new LiteEvent<void>();     
	private onChangePass = new LiteEvent<{}>();     
	private onYesNoCancel = new LiteEvent<EMsgBox>();
	private onInputBox = new LiteEvent<string>();     
	
	public get AlertOK(): ILiteEvent<boolean> { return this.onAlert; } 
    public get LoggedIn(): ILiteEvent<{}> { return this.onLogin; } 
    public get LoggedOut(): ILiteEvent<void> { return this.onLogout; }
    public get PassChanged(): ILiteEvent<{}> { return this.onChangePass; }
    public get YesNoCancel(): ILiteEvent<EMsgBox> { return this.onYesNoCancel; }
    public get InputBoxValue(): ILiteEvent<string> { return this.onInputBox; }
    
	// Funciones privadas
	private _creadiv(nombre): JQuery {
		var div = "<div id='" + nombre + "'></div>";
		this.base.append(div);
		return this.base.find('#'+nombre);
	}
	
	// VALIDACION para Mostrar MsgBOX
	private _valida_opciones_msgbox(opc: IAlert) {
		if (opc.txt_boton_cerrar == undefined) {opc["txt_boton_cerrar"] = "Cerrar";}
		if (opc.boton_cerrar == undefined) {opc["boton_cerrar"] = true;}
		if (opc.timer == undefined) {opc["timer"] = 0; }
		if (opc.modal_header_class == undefined) { opc["modal_header_class"] = "";}
		
		return opc
	}
	
	constructor(div_base?: JQuery) {
		if (div_base == undefined) {
			this.base = $('<div id="msgbox_container" />').appendTo('body');
		} 
		else 
		{ this.base = $(div_base);}
		this.msgbox = this._creadiv('div_msgbox');	// DIV q almacena los .hbs
	}
	
	// Alert MsgBox
	public show_alert(opc: IAlert) {
		var div = "#msgbox";
		var that = this;
		opc = that._valida_opciones_msgbox(opc);
		var tmp = MsgBoxTemplate(opc);
		that.msgbox.html(tmp);
		var div_msg = that.msgbox.find(div);
		div_msg.modal(that._s);
		if (opc.timer > 0) {
			setTimeout(() => { div_msg.modal(that._h); div_msg.html(''); }, opc.timer);
		}
		div_msg.find('#btn_login').on('click', (e) => { 
			e.preventDefault();
			div_msg.modal(that._h);
			div_msg.html('');
			that.onAlert.trigger(true);	
			that.onAlert = new LiteEvent<boolean>();
		});
	}
	public hide_alert() { // 1.6.2
		var that = this;
		var div = "#msgbox";
		var div_msg = that.msgbox.find(div);
		div_msg.modal(that._h);
		div_msg.html('');
		that.onAlert = new LiteEvent<boolean>();
	}
	// Login MsgBOX
	show_login(opc: ILogin): void {
		var that = this;
		var div = '#form_login';
		var tmp = LoginTemplate(opc);
		that.msgbox.html(tmp);
		var form = this.msgbox.find(div);
		form.modal(that._s);
		var btn = form.find('#btn_login');
		form.find('input').on('keypress', function(e) {
			if(e && e.keyCode == 13) {
				e.preventDefault();
				if (that._valida_login(form)) {
					btn.trigger('click');
				}
			}
		})
		btn.on('click', function(e) { // Version 1.5
			e.preventDefault(); 
			form.modal(that._h);  
			console.log('Show Login Click');
			if (that._valida_login(form)) {
				var cadena = form.find(that._f).serializeObject(); //  .serialize();
				setTimeout( () => { 
        			that.onLogin.trigger(cadena);
					that.onLogin = new LiteEvent<{}>();
        		}, 200);
				
			}
			else { /* console.log('Sin datos para Login') */
			}
		});
	}
	
	private _valida_login(form): boolean {
		var campos = ["user", "password"];
		var tmp: string = '';
		var valores = [];
		var devuelve_cero = false;
		for (var i = 0; i < campos.length; ++i) {
			tmp = form.find('#' + campos[i]).val();
			if (tmp.length == 0) { devuelve_cero = true;}
			else {valores.push(tmp)}
		}
		return (valores.length == campos.length)
	}
	private _clear_login(form: JQuery): void {
		var inputs = form.find(':input');
		inputs.each((i) => {
			$(i).val('');
		})
	}
	
	// CambiaPass MsgBox
	show_cambiapass(opc: ICambiaPass) {
		var delay: number = 1000;
		var that = this;
		var tmp = CambiaPassTemplate(opc);
		this.msgbox.html(tmp);
		var form = this.msgbox.find('#form_cambiapass');
		form.modal(that._s);
		var btn = form.find('#btn_login');
		form.find('input').on('keypress', function(e) {
			if(e && e.keyCode == 13) {
			e.preventDefault();
				if (that._valida_cambiapass(form)) {	btn.trigger('click'); } // 1.6.1
			}
		})
		btn.on('click', (e) => { 
			e.preventDefault();
			var subform = form.find(that._f);
			var cadena = subform.serializeObject();
			form.modal(that._h);
			var que: number = that._valida_cambiapass(subform); // Que devuelve 0 si no hace nada, 1 si es OK y 2 si hay error!
			if (que == 1) { // Si todo es correcto!
				setTimeout( () => { 
        			that.onChangePass.trigger(cadena);
					that.onChangePass = new LiteEvent<{}>(); // 1.6.2
        		}, 200);
				
				 }
			else if (que == 2){
				var aler: IAlert = that._valida_opciones_msgbox(opc.alert_change_password_error);
				setTimeout(() => { that.show_alert(aler); }, delay);
			}
		});
		
	}
	
	// Valida los datos de cambiapass
	private _valida_cambiapass(form: JQuery): number {
		var campos = ["oldpass", "newpass", "newpass2"];
		var tmp: string = '';
		var valores = [];
		var devuelve_cero = false;
		for (var i = 0; i < campos.length; ++i) {
			tmp = form.find('#' + campos[i]).val();
			if (tmp.length == 0) { devuelve_cero = true;}
			valores.push(tmp)
		}
		if (devuelve_cero) {
			return 0
		}
		var bln1: boolean = valores[0] != valores[1];
		var bln2: boolean = valores[2] === valores[1];
		var bln3: boolean = (valores[1].length > 0);
		var bln4: boolean = (valores[0].length > 0)
		// Para que sea True, debe de ocurrir que oldpass != newpass y que newpass == newpass2
		
		return (bln1 && bln2 && bln3 && bln4) ? 1 : 2;
	}
	
	// Yes-NO MsgBox
	show_yesno(opc: IYesNoCancel) {
		var delay: number = 1000;
		var div = "#msgbox_yesnocancel";
		var that = this;
		var tmp = YesNoTemplate(opc);
		that.msgbox.html(tmp);
		var div_msg = that.msgbox.find(div);
		div_msg.modal(that._s);
		
		div_msg.find('#btn_yes').on('click', (e) => { 
			e.preventDefault();
			div_msg.modal(that._h);
			that.onYesNoCancel.trigger(0);
		});
		div_msg.find('#btn_no').on('click', (e) => { 
			e.preventDefault();
			div_msg.modal(that._h);
			that.onYesNoCancel.trigger(1);
			
		});
		div_msg.find('#btn_cancel').on('click', (e) => { 
			e.preventDefault();
			div_msg.modal(that._h);
			that.onYesNoCancel.trigger(2);
		});
		
	}
	
	// InputBox 1.7.0 
	public inputbox(opc: IInputBox) {
		var div = "#msgbox";
		var that = this;
		var tmp = InputBoxTemplate(opc);
		that.msgbox.html(tmp);
		var div_msg = that.msgbox.find(div);
		div_msg.modal(that._s);
		
		div_msg.find('#btn_inputbox').on('click', (e) => { 
			e.preventDefault();
			div_msg.modal(that._h);
			var valor = div_msg.find('#valor').val();
			div_msg.html('');
			that.onInputBox.trigger(valor);	
			that.onInputBox = new LiteEvent<string>();
		});
	}
}	
export = MsgBox ;