import { IGraphicObject } from './graphic-object';

export class GraphicStyle {
	protected _graphicObject: any

	protected _fill: number|string;

	protected _stroke: number;
	protected _strokeFill: number|string;

	constructor(graphicObject: any) {
		this._graphicObject = graphicObject;
	}

	get graphicObject(): IGraphicObject { return this._graphicObject; }

	get fill(): number|string { return this._fill; }
	set fill(value: number|string) {
		this._fill = value;
		this.setFill();
	}

	get stroke(): number { return this._stroke; }
	set stroke(value: number) {
		this._stroke = value;
		this.setStroke();
	}

	get strokeWidth(): number|string { return this._strokeFill; }
	set strokeWidth(value: number|string) {
		this._strokeFill = value;
		this.setStrokeWidth();
	}

	public setFill(): void {

	}

	public setStroke(): void {

	}

	public setStrokeWidth(): void {

	}

	public update(): void {
		this.setFill();
		this.setStroke();
		this.setStrokeWidth();
	}
}
