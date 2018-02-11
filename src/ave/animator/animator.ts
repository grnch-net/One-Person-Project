import { AnimationAbstract } from "./animation-abstract";

interface IAnimator {
	active: boolean;
	update(nowTime: number): void;
}

interface IAnimatorParameter {
	active?: boolean;
}

export class Animator extends AnimationAbstract implements IAnimator {
	protected _active: boolean = true;
	protected lastTime: number;

	constructor(parameters: IAnimatorParameter = {}) {
		super();

		this.lastTime = performance.now();
		if (parameters.active) this._active = parameters.active;

	}

	get active(): boolean {
		return this._active;
	}

	set active(value: boolean) {
		if (value == this._active) return;

		if (value === true) {
			this.lastTime = performance.now();
			requestAnimationFrame(this.update.bind(this));
		}
	}

	public update(nowTime: number): void {
		if (!this.active) return;

		let frameTime = nowTime - this.lastTime;
		this.lastTime = nowTime;

		super.update(nowTime);

		requestAnimationFrame(this.update.bind(this));
	}
}
