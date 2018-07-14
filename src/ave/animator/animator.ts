import { AnimationType } from "../config";
import { AnimationAbstract } from "./animation-abstract";
import { IAnimationAbstract, IAnimationAbstractParameter } from "./i-animation-abstract";
import { IAddParameters } from "./i-animation-model";
import { AnimationGroup, IAnimationGroup } from "./animation-group";

export interface IAnimator extends IAnimationAbstract {
	type: AnimationType;
	createGroup(active?: boolean): IAnimationGroup;
}

export interface IAnimatorParameter extends IAnimationAbstractParameter {}

export class Animator extends AnimationAbstract implements IAnimator {
	protected _active: boolean = true;
	protected lastTime: number;

	public get type(): AnimationType { return AnimationType.ANIMATOR };

	public get active(): boolean { return this._active; }
	public set active(value: boolean) {
		if (value == this._active) return;

		this._active = value;

		if (value === true) {
			this.lastTime = performance.now();
			requestAnimationFrame(this.updatePerFrame.bind(this));
		}
	}

	constructor(parameters: IAnimatorParameter = {}) {
		super(parameters);

		this.lastTime = performance.now();
		requestAnimationFrame(this.updatePerFrame.bind(this));
	}

	protected updatePerFrame(nowTime: number): void {
		if (!this.active) return;

		let frameTime = nowTime - this.lastTime;
		this.lastTime = nowTime;

		if(frameTime > 0) this._update(frameTime);

		requestAnimationFrame(this.updatePerFrame.bind(this));
	}

	public createGroup(active: boolean = true): IAnimationGroup {
		let group =  new AnimationGroup({ active: active });
		return this.addGroup(group);
	}
}
