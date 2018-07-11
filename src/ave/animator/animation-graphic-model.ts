import { AnimationType } from "../config";
import { IAnimationModel, IAddParameters } from "./i-animation-model";
import { AnimationModel } from "./animation-model";
import { IGraphicAnimation } from "./animation-graphic";
// import { IVector3d } from '../graphic/point';

export interface IArgumentVector3d {
	x?: number;
	y?: number;
	z?: number;
}

export interface IAnimationGraphicModel extends IAnimationModel {
	transformation: Function;

	add(time: number, parameters: IAddParameters, transformParameters?: IAnimationGraphicAddParameters): IAnimationGraphicModel
}

export interface IAnimationGraphicModelParameters extends IAddParameters {
	timeLength?: number, // millisecond
}

export interface IAnimationGraphicAddParameters {
	position?: IArgumentVector3d;
	rotation?: IArgumentVector3d;
	scale?: IArgumentVector3d;
}

export class AnimationGraphicModel extends AnimationModel implements IAnimationGraphicModel {
	public transformation: Function;

	public get type(): AnimationType { return AnimationType.GRAPHIC_MODEL };

	constructor(parameters: IAnimationGraphicModelParameters) {
		super(parameters);
	}

	public add(
		time: number,
		parameters: IAddParameters,
		transformParameters: IAnimationGraphicAddParameters = {}
	): IAnimationGraphicModel {
		parameters._isInitial = false;
		let model = (this.parent as IGraphicAnimation).add(time, parameters, transformParameters);
		model.active = false;
		this.afterAnimationList.push(model);
		return model as IAnimationGraphicModel;
	}

}
