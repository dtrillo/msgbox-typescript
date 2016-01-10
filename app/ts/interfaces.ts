// Interfaces
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

/*
Opciones de modal_header_class:  --> en bootstrap-extra.css
	modal-header-success
	modal-header-warning
	modal-header-danger
	modal-header-primary

*/

interface ICambiaPass extends IAlert {
	alert_change_password_error: IAlert
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
	funcion_click_yes: any,
	funcion_click_no: any,
	funcion_click_cancel: any
}

interface ILiteEvent<T> {
    on(handler: { (data?: T): void });
    off(handler: { (data?: T): void });
}
