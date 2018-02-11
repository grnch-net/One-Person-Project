import { isUndefined } from "./../../utils/easy-check";

interface IAnimationModel {
	active: boolean,
	time: number, // millisecond
	timeLength: number, // millisecond
	delay: number, // millisecond
	key?: string,
	process?: IAnimationProcess,
	callback?: Function
}

interface IAnimationModelParameters {
	active?: boolean,
	timeLength?: number, // millisecond
	delay?: number, // millisecond
	key?: string,
	process?: IAnimationProcess,
	callback?: Function
}

export interface IAnimationProcess {
	(progress: number): void
}

export class AnimationModel implements IAnimationModel {
	public active: boolean = true;
	public time: number = 0;
	public timeLength: number = 0;
	public delay: number = 0;
	public key: string;
	public process: IAnimationProcess;
	public callback: Function;

	constructor(parameters: IAnimationModelParameters) {
		if (!isUndefined(parameters.active))		this.active = parameters.active;
		if (!isUndefined(parameters.timeLength))	this.timeLength = parameters.timeLength;
		if (!isUndefined(parameters.delay))			this.delay = parameters.delay;
		if (!isUndefined(parameters.key))			this.key = parameters.key;
		if (!isUndefined(parameters.process))		this.process = parameters.process;
		if (!isUndefined(parameters.callback))		this.callback = parameters.callback;
	}
}
