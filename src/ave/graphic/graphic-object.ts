import { GraphicType } from "./../config";
import { GraphicPoint, IGraphicPoint } from "./graphic-point";
import { Quaternion } from "./quaternion";
import { Point } from "./point";
import { GraphicAnimation } from "../animator/animation-graphic";
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
	globalQuaternion: Quaternion;
	quaternion: Quaternion;
	animation: GraphicAnimation;
	scene: ISceneAbstract;

	updateLocal(): IGraphicObject;
}

export class GraphicObject extends GraphicPoint implements IGraphicObject {
	public type: GraphicType = GraphicType.OBJECT;
	public position: Point = new Point( this.updateLocalPosition.bind(this) );
	public globalRotation: Point[] = [
		new Point(null, 1,0,0),
		new Point(null, 0,1,0),
		new Point(null, 0,0,1)
	];
	public rotation: Point = new Point( this.updateLocalRotation.bind(this) );
	public globalScale: Point = new Point(null, 1, 1, 1);
	public scale: Point = new Point( this.updateLocalScale.bind(this), 1, 1, 1 );
	// public children: GraphicPoint[] = [];
	public globalQuaternion: Quaternion = new Quaternion();
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

		if (value) this.scene = value.scene;
		else this.scene = null;

		// this.animation.searchParent();
		value.animation.addGroup(this.animation);


		this.update();
	}

	public updateLocal(): IGraphicObject {
		this.updateLocalPosition();
		this.updateLocalScale();
		this.updateLocalRotation();
		return this;
	}

	protected updateLocalPosition() {
		// this.updateGlobalPosition();
		this.update();
	}

	protected updateGlobalRotation(haveParnet: boolean = !!this.parent): void {
		if (haveParnet) {
			this.globalQuaternion
				.copy(this.quaternion)
				.multiply(this.parent.quaternion)
		}

		let matrix = this.globalQuaternion.getMatrix();
		this.setGlobalRotateAxis(0, ...matrix[0]); // X axis
		this.setGlobalRotateAxis(1, ...matrix[1]); // Y axis
		this.setGlobalRotateAxis(2, ...matrix[2]); // Z axis
	}

	private setGlobalRotateAxis(axis: number, x?: number, y?: number, z?: number) {
		this.globalRotation[axis].set(x, y, z);
	}

	protected updateLocalRotation(): void {
		this.quaternion.setFromEuler(this.rotation.x, this.rotation.y, this.rotation.z);
		this.updateGlobalRotation();
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
	}

	public update(haveParnet: boolean = !!this.parent): boolean {
		if ( this._visible && super.update(haveParnet) ) {
			this.updateGlobalScale(haveParnet);
			this.updateGlobalRotation(haveParnet);
			return true;
		}

		return false;
	}


	public rendering(camera: Camera): boolean {
		if (!this._visible) return false;

		this.addToRenderingQueue(camera);

		if (this.static && this.viewPosition) return false;

		super.rendering(camera);
		return true;
	}

	protected addToRenderingQueue(camera: Camera): void {
		camera.addToViewQueue(this.globalPosition.z, this);
	}
}
