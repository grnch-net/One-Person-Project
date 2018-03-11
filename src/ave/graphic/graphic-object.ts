import { GraphicType } from "./../config";
import { GraphicPoint, IGraphicPoint } from "./graphic-point";
import { Quaternion } from "./quaternion";
import { Point } from "./point";
import { GraphicAnimation } from "./graphic-animation";
import { Camera } from "./../scene/camera";
import { ISceneAbstract } from "./../scene/interface/i-scene-abstract";

export interface IGraphicObject extends IGraphicPoint {
	type: GraphicType;
	static: boolean;
	visible: boolean;
	globalRotation: Point[];
	globalScale: Point;
	position: Point;
	rotation: Point;
	scale: Point;
	parent: IGraphicObject;
	quaternion: Quaternion;
	animation: GraphicAnimation;
	scene: ISceneAbstract;
}

export class GraphicObject extends GraphicPoint implements IGraphicObject {
	public type: GraphicType = GraphicType.OBJECT;
	public globalRotation: Point[] = [
		new Point(null, 1,0,0),
		new Point(null, 0,1,0),
		new Point(null, 0,0,1)
	];
	public globalScale: Point = new Point(null, 1, 1, 1);
	public position: Point = new Point( this.updateLocalPosition.bind(this) );
	public rotation: Point = new Point( this.updateLocalRotation.bind(this) );
	public scale: Point = new Point( this.updateLocalScale.bind(this), 1, 1, 1 );
	// public children: GraphicPoint[] = [];
	public quaternion: Quaternion = new Quaternion();
	public animation: GraphicAnimation = new GraphicAnimation(this);
	public scene: ISceneAbstract;

	// public _id: number;
	public static: boolean = false;
	protected _visible: boolean = true;
	protected _parent: IGraphicObject;

	get visible(): boolean { return this._visible }
	set visible(value: boolean) { this._visible = value; this.update(); }

	get parent(): IGraphicObject { return this._parent }
	set parent(value: IGraphicObject) {
		this._parent = value;

		if (value) {
			this.scene = value.scene;
		} else {
			this.scene = null;
		}

		this.update();
	}

	protected updateLocalPosition() {
		// // save old position data
		// let move = {
		// 	x: this.globalPosition.x,
		// 	y: this.globalPosition.y,
		// 	z: this.globalPosition.z
		// };
		// update postion
		this.updateGlobalPosition();
		// // calculate move
		// move.x = this.globalPosition.x - move.x;
		// move.y = this.globalPosition.y - move.y;
		// move.z = this.globalPosition.z - move.z;
		// // update children
		// this.moveChildren(move.x, move.y, move.z);
	}

	protected updateGlobalRotation(haveParnet: boolean = !!this.parent): void {
		// if (haveParnet) {
		// 	let parentGlRotate = this.parent.globalRotation;
		// 	this.globalRotation.axisX.copy(parentGlRotate.axisX);
		// 	this.globalRotation.axisY.copy(parentGlRotate.axisY);
		// 	this.globalRotation.axisZ.copy(parentGlRotate.axisZ);
		// } else {
		// 	this.globalRotation.axisX.set(1, 0, 0);
		// 	this.globalRotation.axisY.set(0, 1, 0);
		// 	this.globalRotation.axisZ.set(0, 0, 1);
		// }
		// let args = [this.rotation.x, this.rotation.y, this.rotation.z];
		// this.globalRotation.axisX.rotate(...args);
		// this.globalRotation.axisY.rotate(...args);
		// this.globalRotation.axisZ.rotate(...args);
		if (haveParnet) {
			this.quaternion
				.copy(this.parent.quaternion)
				.multiplyEuler(this.rotation.x, this.rotation.y, this.rotation.z);
		} else {
			this.quaternion
				.setFromEuler(this.rotation.x, this.rotation.y, this.rotation.z);
		}

		let matrix = this.quaternion.getMatrix();
		this.setGlobalRotateAxis(0, ...matrix[0]);
		this.setGlobalRotateAxis(1, ...matrix[1]);
		this.setGlobalRotateAxis(2, ...matrix[2]);
	}

	protected setGlobalRotateAxis(axis: number, x?: number, y?: number, z?: number) {
		this.globalRotation[axis].set(x, y, z);
	}

	protected updateLocalRotation(): void {
		this.updateGlobalRotation();
		// this.updateChildren();
	}

	protected updateGlobalScale(haveParnet: boolean = !!this.parent): void {
		if (haveParnet)
			this.globalScale
				.copy(this.parent.globalScale)
				.scale(this.scale.x, this.scale.y, this.scale.z);
		else
			this.globalScale
				.copy(this.scale);
	}

	protected updateLocalScale(): void {
		this.updateGlobalScale();
		// this.updateChildren();
	}

	public update(haveParnet: boolean = !!this.parent): boolean {
		if ( this._visible && super.update(haveParnet) ) {
			this.updateGlobalScale(haveParnet);
			this.updateGlobalRotation(haveParnet);
			// this.updateChildren();
			return true;
		}

		return false;
	}

	// public updateChildren(): GraphicObject {
	// 	this.children.forEach((child: GraphicPoint) => child.update(true));
	// 	return this;
	// }

	// public moveGlobalPosition(x: number, y: number, z: number): void {
	// 	super.moveGlobalPosition(x, y, z);
	// 	// this.moveChildren(x, y, z);
	// }

	// protected moveChildren(x: number, y: number, z: number): void {
	// 	x *= this.scale.x;
	// 	y *= this.scale.y;
	// 	z *= this.scale.x;
	//
	// 	// let matrix = this.globalRotation;
	// 	// x = x*matrix[0].x + y*matrix[1].x + z*matrix[2].x;
	// 	// y = x*matrix[0].y + y*matrix[1].y + z*matrix[2].y;
	// 	// z = x*matrix[0].z + y*matrix[1].z + z*matrix[2].z;
	//
	// 	let point = this.quaternion.vectorRotate({x, y, z});
	//
	// 	this.children.forEach((child: GraphicPoint) => child.moveGlobalPosition(point.x, point.y, point.z));
	// }

	public rendering(camera: Camera): boolean {
		if (!this._visible) return false;
		if (this.static && this.viewPosition) return false;

		// if (!camera) {
		// 	if (!this.scene) return false;
		// 	camera = this.scene.mainCamera;
		// }

		super.rendering(camera);
		// this.children.forEach((child: GraphicPoint) => child.rendering(camera));
		return true;
	}
}
