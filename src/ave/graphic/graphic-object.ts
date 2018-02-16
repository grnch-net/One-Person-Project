import { GraphicPoint } from "./graphic-point"
import { Point } from "./point";

interface IGraphicObject {
	globalRotation: Object;
	globalScale: Point;
	scale: Point;
	parent: IGraphicObject;
	children: GraphicPoint[];
	addPoint(x: number, y: number, z: number): GraphicObject
}

export class GraphicObject extends GraphicPoint implements IGraphicObject {
	public globalRotation: any = {
		axisX: new Point(null,1,0,0),
		axisY: new Point(null,0,1,0),
		axisZ: new Point(null,0,0,1),
	};
	public globalScale: Point = new Point(null, 1, 1, 1);
	public rotation: Point = new Point( this.updateRotation.bind(this) );
	public scale: Point = new Point( this.updateScale.bind(this), 1, 1, 1 );
	public children: GraphicPoint[] = [];

	protected _parent: GraphicObject;

	get parent(): GraphicObject { return this._parent }
	set parent(value: GraphicObject) { this._parent = value; this.update(); }

	protected updateGlobalRotation(): void {
		let parentGlRotate = this.parent.globalRotation;
		this.globalRotation.axisX
			// .set(1, 0, 0)
			.set(parentGlRotate.axisX.x, parentGlRotate.axisX.y, parentGlRotate.axisX.z)
			.rotate(this.rotation.x, this.rotation.y, this.rotation.z);
		this.globalRotation.axisY
			// .set(0, 1, 0)
			.set(parentGlRotate.axisY.x, parentGlRotate.axisY.y, parentGlRotate.axisY.z)
			.rotate(this.rotation.x, this.rotation.y, this.rotation.z);
		this.globalRotation.axisZ
			// .set(0, 0, 1)
			.set(parentGlRotate.axisZ.x, parentGlRotate.axisZ.y, parentGlRotate.axisZ.z)
			.rotate(this.rotation.x, this.rotation.y, this.rotation.z);
	}

	protected updateRotation(): GraphicObject {
		let haveParnet: boolean = !!this.parent;
		if (haveParnet) this.updateGlobalRotation();
		this.children.forEach((child: GraphicPoint) => child.update(haveParnet));
		return this;
	}

	protected updateGlobalScale(): void {
		let parentGlScale = this.parent.globalScale;
		this.globalScale.scale(parentGlScale.x, parentGlScale.y, parentGlScale.z);
	}

	protected updateScale(): GraphicObject {
		let haveParnet: boolean = !!this.parent;
		if (haveParnet) this.updateGlobalScale();
		this.children.forEach((child: GraphicPoint) => child.update(haveParnet));
		return this;
	}

	public update(haveParnet: boolean = null): boolean {
		if ( !super.update(haveParnet) ) {
			this.updateChildren();
			return false;
		}

		this.updateGlobalScale();
		this.updateGlobalRotation();

		this.updateChildren();
		return true;
	}

	protected updateChildren(): void {
		this.children.forEach((child: GraphicPoint) => child.update());
	}

	public addPoint(x: number, y: number, z: number): GraphicObject {
		let newPoint = new GraphicPoint();
		newPoint.parent = this;
		newPoint.position.set(x, y, z);
		this.children.push(newPoint);
		return this;
	}
}
