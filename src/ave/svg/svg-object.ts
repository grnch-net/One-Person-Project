import { GraphicObject, IGraphicObject } from './../graphic/graphic-object';

export interface ISVGObject extends IGraphicObject {
	element: HTMLElement;
}

// export abstract class SVGObject implements ISVGObject {
// 	element: HTMLElement;
// }
