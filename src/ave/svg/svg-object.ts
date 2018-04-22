import { GraphicObject } from './../graphic/graphic-object';

export interface ISVGObject {
	element: HTMLElement;
}

export function SVGObject(parentClass: any = GraphicObject) {
	return class extends parentClass implements ISVGObject {
		public element: HTMLElement;
	}
}
