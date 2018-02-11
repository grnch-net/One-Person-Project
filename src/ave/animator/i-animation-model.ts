import { IAnimationAbstract, IAddParameters } from "./i-animation-abstract"

export interface IAnimationModel {
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

export interface IAnimationModelParameters {
	active?: boolean,
	timeLength?: number, // millisecond
	delay?: number, // millisecond
	key?: string,
	onStart?: Function,
	onUpdate?: IAnimationModelOnUpdate,
	onComplete?: Function
}

export interface IAnimationModelOnUpdate {
	(progress?: number): void;
}
