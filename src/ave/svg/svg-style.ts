import { GraphicStyle } from '../graphic/graphic-style';
import { ISVGObject } from './svg-object';

export class SVGStyle extends GraphicStyle {
	protected _graphicObject: ISVGObject

	constructor(graphicObject: ISVGObject) {
		super(graphicObject);
	}

	public setFill(): void {
		this._graphicObject.element.setAttributeNS(null, 'fill', this._fill.toString() );
	}

	public setStroke(): void {
		this._graphicObject.element.setAttributeNS(null, 'stroke', this._stroke.toString() );
	}

	public setStrokeWidth(): void {
		this._graphicObject.element.setAttributeNS(null, 'stroke-width', this._strokeFill.toString() );
	}
}
