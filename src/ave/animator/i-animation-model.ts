import { AnimationType } from "../config";
import { IAnimationAbstract } from "./i-animation-abstract"

export interface IAnimationModel {
	type: AnimationType;
	parent: IAnimationAbstract;
	_animationComplete(): void;
	add(time: number, parameters: IAddParameters): IAnimationModel;
	active: boolean,
	time: number, // millisecond
	timeLength: number, // millisecond
	delay: number, // millisecond
	key?: string,
	onUpdate?: IAnimationModelOnUpdate,
	onComplete?: Function
}

export interface IAnimationModelParameters extends IAddParameters {
	timeLength?: number, // millisecond
}

export interface IAddParameters {
	active?: boolean,
	delay?: number // millisecond
	key?: string
	onStart?: Function,
	onUpdate?(progress?: number): void,
	onComplete?: Function,
}

export interface IAnimationModelOnUpdate {
	(progress?: number): void;
}
