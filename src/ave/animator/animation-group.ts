import { AnimationAbstract } from "./animation-abstract";
import { isUndefined } from "./../../utils/easy-check";
import { AnimationModel } from "./animation-model";
import { IAddParameters } from "./i-animation-abstract";

export interface IAnimationGroup {
	active: boolean;
	delay?: number;
	_canRemove: boolean;
	createGroup(active?: boolean): AnimationGroup;
}

interface IAnimationGroupParameter {
	active?: boolean;
	delay?: number;
}

export class AnimationGroup extends AnimationAbstract implements IAnimationGroup {
	public active: boolean = true;
	public delay: number = 0;
	public _canRemove: boolean = false;
	protected time: number = 0;

	constructor(parameters: IAnimationGroupParameter = {}) {
		super();
		if (!isUndefined(parameters.active)) this.active = parameters.active;
		if (!isUndefined(parameters.delay)) this.delay = parameters.delay;
	}

	public createGroup(active: boolean = true): AnimationGroup {
		let group =  new AnimationGroup({ active: active });
		return this.addGroup(group);
	}

}
