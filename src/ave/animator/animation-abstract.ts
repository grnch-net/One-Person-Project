import { AnimationType } from "../config";
import { IAnimationAbstract, IAnimationAbstractParameter } from "./i-animation-abstract"
import { IAnimationModel, IAddParameters } from "./i-animation-model";
import { AnimationModel } from "./animation-model";
import { IAnimationGroup } from "./animation-group";

export abstract class AnimationAbstract implements IAnimationAbstract {
	public active: boolean = true;
	public speedMultiply: number = 1;

	protected stack: (IAnimationModel | IAnimationGroup)[] = [];
	protected keyList: { [key: string]: IAnimationModel } = {};

	constructor(parameters: IAnimationAbstractParameter) {
		if (parameters.active) this.active = parameters.active;
		if (parameters.speedMultiply) this.speedMultiply = parameters.speedMultiply;
	}

	public add(time: number = 0, parameters: IAddParameters): IAnimationModel {
		let model: IAnimationModel = new AnimationModel({ ...parameters, timeLength: time });

		let key = model.key;
		if (key) {
			if (this.keyList[key]) this.remove(this.keyList[key]);
			this.keyList[key] = model;
		}

		this.stack.push(model);
		model.parent = this;

		return model;
	}

	public remove(animation: IAnimationModel|number, playCallback: boolean = false): IAnimationModel {
		let index: number;

		if (typeof animation == 'number')
			index = animation;
		else
			index = this.stack.indexOf(animation);

		if (index < 0 || index >= this.stack.length) {
			console.error('Incorrect animation index.', arguments);
			return;
		}

		let model: IAnimationModel = this.stack.splice(index, 1)[0] as IAnimationModel;

		if (playCallback) model._animationComplete();

		if (model.key)
			delete this.keyList[model.key];

			return model;
	}

	public timeout(onComplete: Function, time: number, active: boolean = true): IAnimationModel {
		return this.add(time, { onComplete, active });
	}

	public addGroup(group: IAnimationGroup): IAnimationGroup {
		this.stack.push(group);
		group.parent = this;
		return group;
	}

	public removeGroup(group: IAnimationGroup): IAnimationGroup {
		let index = this.stack.indexOf(group);

		if (index > -1) {
			group.parent = null;
			this.stack.splice(index, 1)
			return group;
		}
	}

	protected _update(frameTime: number): void {
		frameTime *= this.speedMultiply;
		for (let index = this.stack.length -1; index > -1; index--) {
			let animation = this.stack[index];

			if (!animation.active) continue;

			if (animation.delay > 0) {
				animation.delay -= frameTime;

				if (animation.delay <= 0) {
					frameTime -= animation.delay;
				} else continue;
			}

			if (animation.type == AnimationType.MODEL) {
				let model = animation as IAnimationModel;
				model.time += frameTime;
				let progress = model.time / model.timeLength;
				if (progress > 1) progress = 1;
				if (model.onUpdate) model.onUpdate(progress);
				if (progress === 1) this.remove(index, true);
			} else
			if (animation.type == AnimationType.GROUP) {
				// let group = animation as IAnimationGroup;
				(animation as IAnimationGroup).update(frameTime);
			}
		}
	}
}
