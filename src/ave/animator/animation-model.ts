import { AnimationType } from "../config";
import { IAnimationModel, IAnimationModelParameters, IAnimationModelOnUpdate, IAddParameters } from "./i-animation-model";
import { IAnimationAbstract } from "./i-animation-abstract";

export class AnimationModel implements IAnimationModel {
	public parent: IAnimationAbstract;
	public active: boolean = true;
	public timeLength: number = 0;
	public delay: number = 0;
	public key: string;
	public onStart: Function;
	public onUpdate: IAnimationModelOnUpdate;
	public onComplete: Function;

	protected _time: number = 0;
	protected afterAnimationList: IAnimationModel[] = [];

	public get type(): AnimationType { return AnimationType.MODEL };

	constructor(parameters: IAnimationModelParameters) {
		if (parameters.active)		this.active = parameters.active;
		if (parameters.timeLength)	this.timeLength = parameters.timeLength;
		if (parameters.delay)		this.delay = parameters.delay;
		if (parameters.key)			this.key = parameters.key;
		if (parameters.onStart)		this.onStart = parameters.onStart;
		if (parameters.onUpdate)	this.onUpdate = parameters.onUpdate;
		if (parameters.onComplete)	this.onComplete = parameters.onComplete;
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

	protected timeUpdate(value: number) { this._time = value; }

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
