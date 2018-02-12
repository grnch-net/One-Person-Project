import { GraphicPoint } from "./graphic-point"
import { Point } from "./point";

interface IGraphicObject {
	globalRotation: Point;
	globalScale: Point;
	scale: Point;
	parent: IGraphicObject;
	children: any[];
}

export abstract class GraphicObject extends GraphicPoint implements IGraphicObject {
	public globalRotation: Point = new Point();
	public globalScale: Point = new Point(null, 1, 1, 1);
	public rotation: Point = new Point(this.rotationUpdate);
	public scale: Point = new Point(this.scaleUpdate, 1, 1, 1);
	public children: any[] = [];

	protected _parent: GraphicObject;

	get parent(): GraphicObject { return this._parent }
	set parent(value: GraphicObject) { this._parent = value; this.update(); }


	protected rotationUpdate(): void {}

	protected scaleUpdate(): void {}

	public update(): void {
		super.update();

		this.globalRotation.x += this.parent.globalRotation.x;
		this.globalRotation.y += this.parent.globalRotation.y;
		this.globalRotation.z += this.parent.globalRotation.z;

		this.globalScale.x *= this.parent.globalScale.x;
		this.globalScale.y *= this.parent.globalScale.y;
		this.globalScale.z *= this.parent.globalScale.z;
		this.children.forEach((child: GraphicPoint) => child.update());
	}
}
