import { AnimationModel, IAnimationProcess } from "./animation-model";
import { IAnimationGroup } from "./animation-group";

export interface IAnimationAbstract {
	add(time: number, parameters: IAddParameters): AnimationModel;
	remove(animation: AnimationModel|number, playCallback?: boolean): AnimationModel;
	addGroup(group: IAnimationGroup): IAnimationGroup;
	removeGroup(group: IAnimationGroup): IAnimationGroup;
	createGroup(active?: boolean): IAnimationGroup;
	timeout(callback: Function, time: number, active?: boolean): AnimationModel;
	update(frameTime: number): void;
}

export interface IAddParameters {
	active?: boolean,
	delay?: number // millisecond
	process?: IAnimationProcess,
	callback?: Function,
	key?: string
}
