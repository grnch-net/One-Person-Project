import { AnimationType } from "../config";
import { AnimationGroup, IAnimationGroup, IAnimationGroupParameter } from "./animation-group";
import { AnimationGraphicModel, IAnimationGraphicModel, IAnimationGraphicAddParameters } from "./animation-graphic-model";
import { IAnimationModel, IAddParameters, IAnimationModelOnUpdate } from "./i-animation-model";
import { Point, IVector3d } from "../graphic/point";

export interface IGraphicAnimation extends IAnimationGroup {
	type: AnimationType;
	graphicObject: any;

	searchParent(): void;
	add(time: number, animationParameters: IAddParameters, transformParameters?: IAnimationGraphicAddParameters): any;
}

interface IAnimationGraphicParameter extends IAnimationGroupParameter {}

interface IVector3dParameters {
	x?: number,
	y?: number,
	z?: number
}

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

	protected move(end: IVector3dParameters): IAnimationModelOnUpdate {
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

	protected rotate(end: IVector3dParameters): IAnimationModelOnUpdate {
		let start = new Point();
		start.copy(this.graphicObject.rotation);

		let length = new Point();
		length.set(
			(end.x !== undefined)? end.x : start.x,
			(end.y !== undefined)? end.y : start.y,
			(end.z !== undefined)? end.z : start.z
		)
		length.move(-start.x, -start.y, -start.z);

		return (p: number) => {
			this.graphicObject.rotation.set(
				start.x + length.x * p,
				start.y + length.y * p,
				start.z + length.z * p,
			)
		}
	}

	protected scale(end: IVector3dParameters): IAnimationModelOnUpdate {
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
}
