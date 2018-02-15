import { GraphicPoint } from "./graphic-point"
import { Point } from "./point";

interface IGraphicObject {
	globalRotation: Object;
	globalScale: Point;
	scale: Point;
	parent: IGraphicObject;
	children: any[];
}

export abstract class GraphicObject extends GraphicPoint implements IGraphicObject {
	public globalRotation: any = {
		axisX: new Point(null,1,0,0),
		axisY: new Point(null,0,1,0),
		axisZ: new Point(null,0,0,1),
	};
	public globalScale: Point = new Point(null, 1, 1, 1);
	public rotation: Point = new Point(this.updateRotation);
	public scale: Point = new Point(this.updateScale, 1, 1, 1);
	public children: any[] = [];

	protected _parent: GraphicObject;

	get parent(): GraphicObject { return this._parent }
	set parent(value: GraphicObject) { this._parent = value; this.update(); }


	protected updateGlobalRotation(): void {
		let parentGlRotate = this.globalRotation;
		this.globalRotation.axisX
			.set(parentGlRotate.axisX.x, parentGlRotate.axisX.y, parentGlRotate.axisX.z)
			.rotate(this.rotation.x, this.rotation.y, this.rotation.z);
		this.globalRotation.axisY
			.set(parentGlRotate.axisY.x, parentGlRotate.axisY.y, parentGlRotate.axisY.z)
			.rotate(this.rotation.x, this.rotation.y, this.rotation.z);
		this.globalRotation.axisZ
			.set(parentGlRotate.axisZ.x, parentGlRotate.axisZ.y, parentGlRotate.axisZ.z)
			.rotate(this.rotation.x, this.rotation.y, this.rotation.z);
	}

	protected updateRotation(): GraphicObject {
		this.updateGlobalRotation();
		this.children.forEach((child: GraphicPoint) => child.update());
		return this;
	}

	protected updateGlobalScale(): void {
		let parentGlScale = this.parent.globalScale;
		this.globalScale.scale(parentGlScale.x, parentGlScale.y, parentGlScale.z);
	}

	protected updateScale(): GraphicObject {
		this.updateGlobalScale();
		this.children.forEach((child: GraphicPoint) => child.update());
		return this;
	}

	public update(): GraphicObject {
		super.update();
		this.updateGlobalScale();
		this.updateGlobalRotation();
		this.children.forEach((child: GraphicPoint) => child.update());
		return this;
	}

}
