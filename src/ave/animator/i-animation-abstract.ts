import { IAnimationModel } from "./i-animation-model";
import { IAnimationGroup } from "./animation-group";

export interface IAnimationAbstract {
	active: boolean;
	speedMultiply: number;

	add(time: number, parameters: IAddParameters): IAnimationModel;
	remove(animation: IAnimationModel|number, playCallback?: boolean): IAnimationModel;
	addGroup(group: IAnimationGroup): IAnimationGroup;
	removeGroup(group: IAnimationGroup): IAnimationGroup;
	timeout( callback: Function, time: number, active?: boolean): IAnimationModel;
}

export interface IAddParameters {
	active?: boolean,
	delay?: number // millisecond
	onStart?: Function,
	onUpdate?(progress?: number): void,
	onComplete?: Function,
	key?: string
}

export interface IAnimationAbstractParameter {
	active?: boolean;
	speedMultiply?: number;
}
