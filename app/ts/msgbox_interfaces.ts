// Interfaces 1.7.0
enum EMsgBox {
		Yes,
		No,
		Cancel
	}

interface IAlert {
	titulo: string,
	mensaje: string,
	txt_boton_cerrar?: string,
	boton_cerrar: boolean,
	btn_class: string,
	timer?: number
	modal_header_class?: string,
	funcion_click_cerrar?: any // Function
}

interface ILogin {
	modal_header_class?: string,
	titulo: string,
	usuario: string,
	btn_entrar_class: string,
	btn_cerrar_class: string
}
        	
/*
Opciones de modal_header_class:  --> en bootstrap-extra.css
	modal-header-success
	modal-header-warning
	modal-header-danger
	modal-header-primary

*/

interface ICambiaPass extends IAlert {
	alert_change_password_error: IAlert
	btn_volver_class: string,
    btn_cambiar_class: string
}

interface IYesNoCancel {
	titulo: string,
	mensaje: string,
	boton_cerrar: boolean,
	modal_header_class?: string,
	txt_boton_no: string,
	txt_boton_yes: string,
	txt_boton_cancel: string,
	boton_cancel: boolean,
	cancel_btn_class: string,
	yes_btn_class: string,
	no_btn_class: string,
	// funcion_click_yes?: any, // DEPRECATED 1.4.2
	// funcion_click_no?: any,
	// funcion_click_cancel?: any,
}

interface ILiteEvent<T> {
    on(handler: { (data?: T): void });
    off(handler: { (data?: T): void });
}

interface JQuery {
	serializeObject: any,
	serializeJSON: string
}

interface IDivAlert {
	mensaje: string,
	tiempo?: number,
	clase?: string
}
interface IInputBox { 
        		modal_header_class: string,
        		boton_cerrar: Boolean,
        		titulo: string,
        		mensaje: string,
        		placeholder: string,
        		valor: string|number,
        		btn_class: string,
        		txt_boton_cerrar: string,
}
// ***** MsgBox Interfaces - FIN