import { GraphicObject, IGraphicObject } from './../graphic/graphic-object';
import { SVGStyle } from './svg-style';

export interface ISVGObject {
	element: HTMLElement;
	style: SVGStyle;
}

export function SVGObject(parentClass: any = GraphicObject) {
	return class extends parentClass implements ISVGObject {
		public element: HTMLElement;
		public style: SVGStyle = new SVGStyle(this);
	}
}
