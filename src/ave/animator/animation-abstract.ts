import { AnimationType } from "../config";
import { IAnimationAbstract, IAnimationAbstractParameter } from "./i-animation-abstract"
import { IAnimationModel, IAddParameters } from "./i-animation-model";
import { AnimationModel } from "./animation-model";
import { IAnimationGraphicModel } from "./animation-graphic-model";
import { IAnimationGroup } from "./animation-group";

export abstract class AnimationAbstract implements IAnimationAbstract {
	public active: boolean = true;
	public speedMultiply: number = 1;

	protected stack: (IAnimationModel | IAnimationGroup | IAnimationGraphicModel)[] = [];
	protected keyList: { [key: string]: IAnimationModel | IAnimationGraphicModel } = {};

	constructor(parameters: IAnimationAbstractParameter) {
		if (parameters.active) this.active = parameters.active;
		if (parameters.speedMultiply) this.speedMultiply = parameters.speedMultiply;
	}

	public add(time: number = 0, parameters: IAddParameters): IAnimationModel {
		let model: IAnimationModel = new AnimationModel({ ...parameters, timeLength: time });

		if (model.key) {
			if (this.keyList[model.key]) this.remove(this.keyList[model.key] as IAnimationModel);
			this.keyList[model.key] = model;
		}

		this.stack.push(model);
		model.parent = this;

		if (parameters._isInitial !== false && model._initial) model._initial();

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

				if (animation.delay < 0) {
					frameTime += animation.delay;
				} else continue;
			}

			if (animation.type == AnimationType.GROUP) {
				(animation as IAnimationGroup).update(frameTime);
			} else {
				this.updateModel(index, animation as IAnimationModel, frameTime);
			}
		}
	}

	protected updateModel(index: number, model: IAnimationModel, frameTime: number): number {
		model.time += frameTime;

		let progress, _progress;
		progress = _progress = model.time / model.timeLength;

		if (progress > 1) {
			if (model.yoyo) {
				progress = 1 - (progress -1);
			} else {
				progress = 1;
			}
		}

		if (model.onUpdate) model.onUpdate(progress);

		if ((model as IAnimationGraphicModel).transformation)
			(model as IAnimationGraphicModel).transformation(progress);

		if ( (!model.yoyo &&_progress >= 1)
			|| (model.yoyo && _progress >= 2)
		) {
			if (model.loop) {
				if (model.onComplete) model.onComplete();

				if (model.yoyo) {
					model.time = model.time - model.timeLength *2;
				} else {
					model.time = model.time - model.timeLength;
				}
			} else {
				this.remove(index, true);
			}
		}

		return progress;
	}
}
