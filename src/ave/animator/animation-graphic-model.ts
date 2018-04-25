import { AnimationType } from "../config";
import { IAnimationModel, IAnimationModelParameters, IAnimationModelOnUpdate, IAddParameters } from "./i-animation-model";
import { AnimationModel } from "./animation-model";
import { IAnimationAbstract } from "./i-animation-abstract";
import { IVector3d } from '../graphic/point';

export interface IAnimationGraphicModel extends IAnimationModel {
	graphicObjectAnimation: Function;

	add(time: number, parameters: IAddParameters): IAnimationGraphicModel
}

export interface IAnimationGraphicModelParameters extends IAddParameters {
	timeLength?: number, // millisecond
}

export class AnimationGraphicModel extends AnimationModel implements IAnimationGraphicModel {
	public parent: IAnimationAbstract;
	public graphicObjectAnimation: Function;

	public get type(): AnimationType { return AnimationType.GRAPHIC_MODEL };

	constructor(parameters: IAnimationGraphicModelParameters) {
		super(parameters);
	}

	public add(time: number, parameters: IAddParameters): IAnimationGraphicModel {
		let model = this.parent.add(time, parameters);
		model.active = false;
		this.afterAnimationList.push(model);
		return model as IAnimationGraphicModel;
	}

}
