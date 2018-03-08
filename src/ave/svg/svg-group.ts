import { GraphicGroup, IGraphicGroup } from './../graphic/graphic-group';
import { ISVGObject } from './svg-object';
import { ISceneSVG } from './svg-scene';

export interface ISVGGroup {
	addChild(graphicObject: ISVGObject, index?: number): ISVGGroup;
	removeChild(graphicObject: ISVGObject): ISVGGroup | null;

	children: ISVGObject[];
}

export class SVGGroup extends GraphicGroup implements ISVGGroup {
	public children: ISVGObject[];

	public addChild(graphicObject: ISVGObject, index: number = null): SVGGroup {
		super.addChild(graphicObject, index);
		(this.scene as ISceneSVG).updateDOM();
		return this;
	}

	public removeChild(graphicObject: ISVGObject): SVGGroup | null {
		if (super.removeChild(graphicObject) != null) {
			(this.scene as ISceneSVG).updateDOM();
		}
		return this;
	}
}
