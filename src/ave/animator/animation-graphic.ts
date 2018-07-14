import { AnimationType } from "../config";
import { AnimationGroup, IAnimationGroup, IAnimationGroupParameter } from "./animation-group";
import { AnimationGraphicModel, IAnimationGraphicModel, IAnimationGraphicAddParameters, IArgumentVector3d, ITransformRotationParameters } from "./animation-graphic-model";
import { IAnimationModel, IAddParameters, IAnimationModelOnUpdate } from "./i-animation-model";
import { Point } from "../graphic/point";

import { Quaternion } from "../graphic/quaternion";

export interface IGraphicAnimation extends IAnimationGroup {
	type: AnimationType;
	graphicObject: any;

	searchParent(): void;
	add(time: number, animationParameters: IAddParameters, transformParameters?: IAnimationGraphicAddParameters): any;
}

interface IAnimationGraphicParameter extends IAnimationGroupParameter {}

export class GraphicAnimation extends AnimationGroup implements IGraphicAnimation {

	constructor(
		public graphicObject: any,
		parameters: IAnimationGraphicParameter = {}
	) {
		super(parameters);
		this.parent = null;
	}

	public searchParent(): void {
		let animator = this.parent;
		let parent = this.graphicObject.parent;
		while (!animator && parent) {
			animator = parent.animation.animator;
			parent = parent.parent;
		}

		if (animator) animator.addGroup(this);
	}

	public add(
		time: number,
		animationParameters: IAddParameters,
		transformParameters: IAnimationGraphicAddParameters = {}
	): IAnimationGraphicModel | IAnimationModel {
		if (Object.keys(transformParameters).length == 0)
			return super.add(time, animationParameters) as IAnimationModel;

		let model: IAnimationGraphicModel = new AnimationGraphicModel({ ...animationParameters, timeLength: time });

		if (model.key) {
			if (this.keyList[model.key]) this.remove(this.keyList[model.key] as IAnimationGraphicModel);
			this.keyList[model.key] = model;
		}

		this.stack.push(model);
		model.parent = this;

		let transformList: Function[] = [];
		let listLength: number;

		model._initial = () => {
			if (transformParameters.position) transformList.push(this.move(transformParameters.position));
			if (transformParameters.scale) transformList.push(this.scale(transformParameters.scale));
			if (transformParameters.rotation) transformList.push(this.rotate(transformParameters.rotation));
			listLength = transformList.length;
		}

		if (animationParameters._isInitial !== false) model._initial();

		model.transformation = (p: number) => {
			for(let i=0; i<listLength; i++) {
				transformList[i](p);
			}
			this.graphicObject.updateLocal();
		}


		return model;
	}

	protected move(end: IArgumentVector3d): IAnimationModelOnUpdate {
		let start = new Point();
		start.copy(this.graphicObject.position);

		let length = new Point();
		length.set(
			(end.x !== undefined)? end.x : start.x,
			(end.y !== undefined)? end.y : start.y,
			(end.z !== undefined)? end.z : start.z
		)
		length.move(-start.x, -start.y, -start.z);

		return (p: number) => {
			this.graphicObject.position.set(
				start.x + length.x * p,
				start.y + length.y * p,
				start.z + length.z * p,
			)
		}
	}

	protected scale(end: IArgumentVector3d): IAnimationModelOnUpdate {
		let start = new Point();
		start.copy(this.graphicObject.scale);

		let length = new Point();
		length.set(
			(end.x !== undefined)? end.x : start.x,
			(end.y !== undefined)? end.y : start.y,
			(end.z !== undefined)? end.z : start.z
		)
		length.move(-start.x, -start.y, -start.z);


		return (p: number) => {
			this.graphicObject.scale.set(
				start.x + length.x * p,
				start.y + length.y * p,
				start.z + length.z * p,
			)
		}
	}

	protected rotate(end: ITransformRotationParameters): IAnimationModelOnUpdate {
		let start = new Point();
		start.copy(this.graphicObject.rotation);

		let length = new Point();
		length.set(
			(end.x !== undefined)? end.x : start.x,
			(end.y !== undefined)? end.y : start.y,
			(end.z !== undefined)? end.z : start.z
		)
		length.move(-start.x, -start.y, -start.z);

		let max_angle = length.x;
		if (length.y > max_angle) max_angle = length.y;
		if (length.z > max_angle) max_angle = length.z;

		if (end.euler === false) {
			let quaternion_limit = (end.angleLimit)? end.angleLimit : 90;
			let updateQuaternion = this.rotateQuaternion(end, Math.abs(Math.ceil(max_angle/quaternion_limit)) );

			return (p: number) => {
				updateQuaternion(p);

				this.graphicObject.rotation._set(
					start.x + length.x * p,
					start.y + length.y * p,
					start.z + length.z * p,
				)
			}
		} else {
			return (p: number) => {
				this.graphicObject.rotation.set(
					start.x + length.x * p,
					start.y + length.y * p,
					start.z + length.z * p,
				)
			}
		}
	}

	protected rotateQuaternion(end: IArgumentVector3d, amt: number): IAnimationModelOnUpdate {
		let startEuler: Point = this.graphicObject.rotation;
		let startList: Quaternion[] = [];
		let lengthList: Quaternion[] = [];

		let startList2: Quaternion[] = [];
		let lengthList2: Quaternion[] = [];

		startList.push(new Quaternion());
		startList[0].copy(this.graphicObject.quaternion);

		for (let i=0; i<amt; i++) {
			let start = startList[i];

			let j = i+1;
			let lengthEuler = {
				x: (end.x !== undefined)? (end.x / amt * j) : startEuler.x,
				y: (end.y !== undefined)? (end.y / amt * j) : startEuler.y,
				z: (end.z !== undefined)? (end.z / amt * j) : startEuler.z
			};

			let length = new Quaternion();
			length.multiplyEuler(lengthEuler.x, lengthEuler.y, lengthEuler.z);

			let nextStart = new Quaternion();
			nextStart.copy(length);
			startList.push(nextStart);

			let inner = length.inner_product(start, length);
			if (inner < 0) length.conjugate();
			length.w -= start.w;
			length.x -= start.x;
			length.y -= start.y;
			length.z -= start.z;

			lengthList.push(length);

		}

		let st = 1/amt;
		return (p: number) => {
			if (p === 1) {
				this.graphicObject.quaternion.copy(startList[amt]);
				return;
			}

			let i = Math.floor(amt*p);
			let _p = (p%st) /st;
			this.graphicObject.quaternion.set(
				startList[i].w + lengthList[i].w * _p,
				startList[i].x + lengthList[i].x * _p,
				startList[i].y + lengthList[i].y * _p,
				startList[i].z + lengthList[i].z * _p,
				true
			);
		}
	}
}
