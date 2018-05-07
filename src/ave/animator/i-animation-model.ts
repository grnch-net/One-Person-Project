import { AnimationType } from "../config";
import { IAnimationAbstract } from "./i-animation-abstract"

export interface IAnimationModel {
	type: AnimationType;
	parent: IAnimationAbstract;
	_animationComplete(): void;
	add(time: number, parameters: IAddParameters): IAnimationModel;
	active: boolean;
	loop: boolean;
	yoyo: boolean;
	time: number; // millisecond
	timeLength: number; // millisecond
	delay: number; // millisecond
	key?: string;
	onUpdate?: IAnimationModelOnUpdate;
	onComplete?: Function;
	_initial: Function;
}

export interface IAnimationModelParameters extends IAddParameters {
	timeLength?: number; // millisecond
}

export interface IAddParameters {
	active?: boolean;
	loop?: boolean;
	yoyo?: boolean;
	delay?: number; // millisecond
	key?: string;
	onStart?: Function;
	onUpdate?(progress?: number): void;
	onComplete?: Function;
	_initial?: Function;
	_isInitial?: boolean;
}

export interface IAnimationModelOnUpdate {
	(progress?: number): void;
}
