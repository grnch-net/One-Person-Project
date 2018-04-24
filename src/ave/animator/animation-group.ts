import { AnimationType } from "../config";
import { AnimationAbstract } from "./animation-abstract";
import { IAnimationAbstract, IAnimationAbstractParameter } from "./i-animation-abstract";

export interface IAnimationGroup extends IAnimationAbstract {
	type: AnimationType;
	time: number;
	delay: number;
	canRemove: boolean;
	createGroup(active?: boolean): IAnimationGroup;
	update(nowTime: number): void;
}

interface IAnimationGroupParameter extends IAnimationAbstractParameter {
	delay?: number;
}

export class AnimationGroup extends AnimationAbstract implements IAnimationGroup {
	public time: number = 0;
	public delay: number = 0;

	protected _canRemove: boolean = false;

	public get type(): AnimationType { return AnimationType.GROUP };
	public get canRemove(): boolean { return this._canRemove; };

	constructor(parameters: IAnimationGroupParameter = {}) {
		super(parameters);
		if (parameters.active) this.active = parameters.active;
		if (parameters.delay) this.delay = parameters.delay;
	}

	public destroy(): IAnimationGroup {
		this._canRemove = true;
		return this;
	}

	public createGroup(active: boolean = true): IAnimationGroup {
		let group =  new AnimationGroup({ active: active });
		return this.addGroup(group);
	}

	public update(frameTime: number) {
		this._update(frameTime);
	}
}
