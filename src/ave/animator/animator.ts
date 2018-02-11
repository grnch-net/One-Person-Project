import { AnimationAbstract } from "./animation-abstract";
import { AnimationGroup } from "./animation-group";
import { AnimationModel } from "./animation-model";
import { IAddParameters } from "./i-animation-abstract";
import { isUndefined } from "./../../utils/easy-check";

export interface IAnimator {
	active: boolean;
	update(nowTime: number): void;
	add(time: number, parameters: IAddParameters): AnimationModel;
	createGroup(active?: boolean): AnimationGroup;
}

export interface IAnimatorParameter {
	active?: boolean;
}

export class Animator extends AnimationAbstract implements IAnimator {
	protected _active: boolean = true;
	protected lastTime: number;

	constructor(parameters: IAnimatorParameter = {}) {
		super();

		this.lastTime = performance.now();
		if (!isUndefined(parameters.active)) this._active = parameters.active;

		requestAnimationFrame(this.update.bind(this));
	}

	get active(): boolean {
		return this._active;
	}

	set active(value: boolean) {
		if (value == this._active) return;

		this._active = value;

		if (value === true) {
			this.lastTime = performance.now();
			requestAnimationFrame(this.update.bind(this));
		}
	}

	public update(nowTime: number): void {
		if (!this.active) return;

		let frameTime = nowTime - this.lastTime;
		this.lastTime = nowTime;

		super.update(frameTime);

		requestAnimationFrame(this.update.bind(this));
	}

	public add(time: number = 0, parameters: IAddParameters): AnimationModel {
		let model: AnimationModel = super.add(time, parameters);
		model.parent = this;
		return model;
	}

	public createGroup(active: boolean = true): AnimationGroup {
		let group =  new AnimationGroup({ active: active });
		return this.addGroup(group);
	}
}
