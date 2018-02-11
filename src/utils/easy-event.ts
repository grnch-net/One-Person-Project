import { IEasyEvent, IEventsList } from "./i-easy-event";

let windowEventsList: IEventsList = {};
let documentEventsList: IEventsList = {};

export let easyEvent: IEasyEvent = {
	addEvent: function (
		element: HTMLElement | Window | HTMLDocument,
		type: string[] | string,
		callback: { [key: string]: any } | Function,
		useCapture: boolean = false
	): void {
		if (element instanceof Window) {
			if (Array.isArray(type))
				type.forEach((key:string) => addToList(element, windowEventsList, key, callback, useCapture));
			else
				addToList(element, windowEventsList, type, callback, useCapture);
		} else
		if (element instanceof HTMLDocument) {
			if (Array.isArray(type))
				type.forEach((key:string) => addToList(element, documentEventsList, key, callback, useCapture));
			else
				addToList(element, documentEventsList, type, callback, useCapture);
		} else {
			if (Array.isArray(type))
				type.forEach((key:string) => addToElement(element, key, callback, useCapture));
			else
				addToElement(element, type, callback, useCapture);
		}
	}

}

let addToList = (element: any, list: IEventsList, key: string, callback: { [key: string]: any } | Function, useCapture: boolean) => {
	let lowKey = key.toLowerCase();
	if (!list[lowKey]) {
		list[lowKey] = [];
		element['on'+lowKey] = (e: any) => list[lowKey].forEach((func: Function) => func(e));
	}
	if (typeof callback == 'object') {
		if (callback['on'+key] instanceof Function) {
			list[lowKey].push(callback['on'+key]);
		} else {
			console.error(`Function "on${key}" is missing.`);
			return
		}
	} else {
		list[lowKey].push(callback);
	}
}

let addToElement = (element: any, key: string, callback: { [key: string]: any } | Function, useCapture: boolean): void => {
	let lowKey = key.toLowerCase();
	if (typeof callback == 'object') {
		if (callback['on'+key] instanceof Function) {
			element.addEventListener(lowKey, (e: any)=>callback['on'+key](e), useCapture);
		} else {
			console.error(`Function "on${key}" is missing.`);
			return
		}
	} else {
		element.addEventListener(lowKey, (e: any)=>callback(e), useCapture);
	}
}
