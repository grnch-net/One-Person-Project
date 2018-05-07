import { IAnimationModel, IAddParameters } from "./i-animation-model";
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

export interface IAnimationAbstractParameter {
	active?: boolean;
	speedMultiply?: number;
}
