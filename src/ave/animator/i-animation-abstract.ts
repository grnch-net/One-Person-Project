import { AnimationModel } from "./animation-model";
import { AnimationGroup } from "./animation-group";

export interface IAnimationAbstract {
	speed: number;
	add(time: number, parameters: IAddParameters): AnimationModel;
	remove(animation: AnimationModel|number, playCallback?: boolean): AnimationModel;
	addGroup(group: AnimationGroup): AnimationGroup;
	removeGroup(group: AnimationGroup): AnimationGroup;
	timeout( callback: Function, time: number, active?: boolean): AnimationModel;
	update(frameTime: number): void;
}

export interface IAddParameters {
	active?: boolean,
	delay?: number // millisecond
	onStart?: Function,
	onUpdate?(progress?: number): void,
	onComplete?: Function,
	key?: string
}
