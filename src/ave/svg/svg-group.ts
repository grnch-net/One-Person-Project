import { GraphicGroup, IGraphicGroup } from './../graphic/graphic-group';
import { ISVGObject } from './svg-object';

export interface ISVGGroup extends IGraphicGroup {
	children: ISVGObject[];
}

export abstract class SVGGroup extends GraphicGroup implements ISVGGroup {
	public children: ISVGObject[];
}
