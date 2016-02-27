/// <reference path="../typings/jquery.d.ts" />
/// <reference path="../typings/bootstrap.d.ts" />
/// <reference path="interfaces.ts" />
/// <reference path="LiteEvent.ts" />

var __UPDATED__ = '2016.02.10';
var __VERSION__ = "1.6.0";
var __AUTHOR__ = 'David Trillo';
var __WEBSITE__ = '';

import $ = require("jquery");
import LiteEvent = require("liteevent");

class Flash_msgbox {
	private _div_alert: JQuery; // div_alert
	private _div_alert_close_btn: JQuery;
	
	extraclass: string = "";
	extraclassdefault: string = '';
	constructor(div: string, defaultclass: string = "alert-warning") {
		this.set_div_alert(div, defaultclass);
	}
	// DIV alert - Version 1.6.0
	set_div_alert(div: string, defaultclass: string = "alert-warning") { // 1.4.5
		this._div_alert = $(div);
		this.div_alert_stop();
		this._div_alert.removeClass('hide'); // 1.4.5
		this.extraclassdefault = defaultclass;
		this._div_alert.find('.alert').addClass(this.extraclassdefault);
		this._div_alert.on('click', (e) => { this.div_alert_stop() })
	}
	
	div_alert(opc: IDivAlert) {
		var that = this;
		if (opc["clase"] == undefined) { opc.clase = "";}
		if (opc["tiempo"] == undefined) { opc.tiempo = 0}
		if (opc.clase.length > 0) { // 1.4.6
			that.extraclass = opc.clase;
			that._div_alert.find('.alert').removeClass(that.extraclassdefault).addClass(that.extraclass);
		}
		that._div_alert.show();
		that._div_alert_close_btn = that._div_alert.find('button');
		var _msg = that._div_alert.find('#mensaje');
		_msg.html(opc.mensaje);
		if (opc.tiempo > 0) { setTimeout( () => { that.div_alert_stop(); }, opc.tiempo);	}
		that._div_alert_close_btn.on('click', (e) => { that.div_alert_stop();}) // 1.4.6
	}
	div_alert_stop() {
		var that = this;
		this._div_alert.hide(); // 1.4.6
		if (this.extraclass.length > 0) {
			that._div_alert.find('.alert').removeClass(that.extraclass).addClass(that.extraclassdefault)
			this.extraclass = "";
		}
	}
}	
export = Flash_msgbox ;