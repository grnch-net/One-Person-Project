import { AnimationType } from "../config";
import { AnimationAbstract } from "./animation-abstract";
import { IAnimationAbstract, IAnimationAbstractParameter } from "./i-animation-abstract";

export interface IAnimationGroup extends IAnimationAbstract {
	type: AnimationType;
	parent: IAnimationAbstract;
	time: number;
	delay: number;
	createGroup(active?: boolean): IAnimationGroup;
	update(nowTime: number): void;
}

export interface IAnimationGroupParameter extends IAnimationAbstractParameter {
	delay?: number;
}

export class AnimationGroup extends AnimationAbstract implements IAnimationGroup {
	public parent: IAnimationAbstract;

	public time: number = 0;
	public delay: number = 0;

	public get type(): AnimationType { return AnimationType.GROUP };

	constructor(parameters: IAnimationGroupParameter = {}) {
		super(parameters);
		if (parameters.delay) this.delay = parameters.delay;
	}

	public createGroup(active: boolean = true): IAnimationGroup {
		let group =  new AnimationGroup({ active: active });
		return this.addGroup(group);
	}

	public update(frameTime: number) {
		this._update(frameTime);
	}
}
