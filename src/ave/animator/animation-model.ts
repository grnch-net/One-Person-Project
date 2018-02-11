import { IAnimationModel, IAnimationModelParameters, IAnimationModelOnUpdate } from "./i-animation-model";
import { IAnimationAbstract, IAddParameters } from "./i-animation-abstract";
import { isUndefined } from "./../../utils/easy-check";

export class AnimationModel implements IAnimationModel {
	protected _time: number = 0;
	protected afterAnimationList: IAnimationModel[] = [];

	public parent: IAnimationAbstract;
	public active: boolean = true;
	public timeLength: number = 0;
	public delay: number = 0;
	public key: string;
	public onStart: Function;
	public onUpdate: IAnimationModelOnUpdate;
	public onComplete: Function;

	constructor(parameters: IAnimationModelParameters) {
		if (!isUndefined(parameters.active))		this.active = parameters.active;
		if (!isUndefined(parameters.timeLength))	this.timeLength = parameters.timeLength;
		if (!isUndefined(parameters.delay))			this.delay = parameters.delay;
		if (!isUndefined(parameters.key))			this.key = parameters.key;
		if (!isUndefined(parameters.onStart))		this.onStart = parameters.onStart;
		if (!isUndefined(parameters.onUpdate))		this.onUpdate = parameters.onUpdate;
		if (!isUndefined(parameters.onComplete))	this.onComplete = parameters.onComplete;
	}

	get time(): number { return this._time; }
	set time(value: number) {
		if (this.onStart) this.onStart();
		this.timeUpdate(value);

		Object.defineProperty(this, 'time', {
			get: (): number => { return this._time },
			set: this.timeUpdate
		});
	}

	private timeUpdate(value: number) { this._time = value; }

	public add(time: number, parameters: IAddParameters): IAnimationModel {
		let model = this.parent.add(time, parameters);
		model.active = false;
		this.afterAnimationList.push(model);
		return model;
	}

	public _animationComplete(): void {
		if (this.onComplete) this.onComplete();

		this.afterAnimationList.forEach((model: IAnimationModel) => {
		    model.active = true;
		});
	}
}
