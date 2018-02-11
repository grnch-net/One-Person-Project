import { AnimationAbstract } from "./animation-abstract";
import { isUndefined } from "./../../utils/easy-check";

export interface IAnimationGroup {
	active: boolean;
	delay?: number;
}

interface IAnimationGroupParameter {
	active?: boolean;
	delay?: number;
}

export class AnimationGroup extends AnimationAbstract implements IAnimationGroup {
	public active: boolean = true;
	public delay: number = 0;
	protected time: number = 0;

	constructor(parameters: IAnimationGroupParameter = {}) {
		super();
		if (!isUndefined(parameters.active)) this.active = parameters.active;
		if (!isUndefined(parameters.delay)) this.delay = parameters.delay;

		super.createGroup = (active: boolean = true): IAnimationGroup => {
			let group =  new AnimationGroup({ active: active });
			return this.addGroup(group);
		}
	}

}
