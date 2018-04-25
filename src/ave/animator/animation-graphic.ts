import { AnimationType } from "../config";
import { AnimationGroup, IAnimationGroup, IAnimationGroupParameter } from "./animation-group";
import { IAnimationAbstract } from "./../animator/i-animation-abstract";
import { AnimationGraphicModel, IAnimationGraphicModel } from "./animation-graphic-model";
import { IAddParameters } from "./i-animation-model";
import { Point, IVector3d } from "../graphic/point"

interface IGraphicAnimation extends IAnimationGroup {
	type: AnimationType;
	graphicObject: any;

	searchParent(): void;
	add(time: number, animationParameters: IAddParameters, objectParameters?: IAnimationGraphicAddParameters): any;
}

interface IAnimationGraphicParameter extends IAnimationGroupParameter {}

export interface IAnimationGraphicAddParameters {
	position?: IVector3d;
	rotate?: IVector3d | number;
	scale?: IVector3d | number;
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

		animator.addGroup(this);
	}

	public add(time: number, animationParameters: IAddParameters, objectParameters: IAnimationGraphicAddParameters = {}): any {
		// if (parameters.position) {
		//
		// }


		let model: IAnimationGraphicModel = new AnimationGraphicModel({ ...animationParameters, timeLength: time });

		let key = model.key;
		if (key) {
			if (this.keyList[key]) this.remove(this.keyList[key]);
			this.keyList[key] = model;
		}

		this.stack.push(model);
		model.parent = this;

		return model;
	}

	protected move(end: IVector3d): Function {
		let start = new Point();
		start.copy(this.graphicObject.position);

		let length = new Point();
		length.copy(end);
		length.move(-start.x, -start.y, -start.z);

		return (p: number) => {
			this.graphicObject.position.set(
				start.x + length.x * p,
				start.y + length.y * p,
				start.z + length.z * p,
			)
			// this.graphicObject.updateLocal();
		}
	}

	protected rotate(): void {

	}

	protected scale(): void {

	}
}
