import { IAnimationAbstract, IAddParameters } from "./i-animation-abstract"
import { AnimationModel } from "./animation-model";
import { AnimationGroup } from "./animation-group";

export abstract class AnimationAbstract implements IAnimationAbstract {
	public speed: number = 1;

	protected stack: (AnimationModel | AnimationGroup)[] = [];
	protected keyList: { [key: string]: AnimationModel } = {};

	constructor() {}

	public add(time: number = 0, parameters: IAddParameters): AnimationModel {
		let model: AnimationModel = new AnimationModel({ ...parameters, timeLength: time });

		let key = model.key;
		if (key) {
			if (this.keyList[key]) this.remove(this.keyList[key]);
			this.keyList[key] = model;
		}

		this.stack.push(model);
		model.parent = this;

		return model;
	}

	public remove(animation: AnimationModel|number, playCallback: boolean = false): AnimationModel {
		let index: number;

		if (typeof animation == 'number')
			index = animation;
		else
			index = this.stack.indexOf(animation);

		if (index < 0 || index >= this.stack.length) {
			console.error('Incorrect animation index.', arguments);
			return;
		}

		let model: AnimationModel = this.stack.splice(index, 1)[0] as AnimationModel;

		if (playCallback) model._animationComplete();

		if (model.key)
			delete this.keyList[model.key];

			return model;
	}

	public timeout(onComplete: Function, time: number, active: boolean = true): AnimationModel {
		return this.add(time, { onComplete, active });
	}

	public addGroup(group: AnimationGroup): AnimationGroup {
		this.stack.push(group);
		return group;
	}

	public removeGroup(group: AnimationGroup): AnimationGroup {
		let index = this.stack.indexOf(group);

		if (index > -1) {
			group._canRemove = true;
			return group;
		}
	}

	public createGroup(active: boolean = true) {
		// Rewrite on AnimationGroup class.
		console.error('Need to override(rewrite) this method.');
		return { active } as AnimationGroup;
	}

	public update(frameTime: number): void {
		frameTime *= this.speed;
		for (let index = this.stack.length -1; index > -1; index--) {
			let animation = this.stack[index];

			if (!animation.active) continue;

			if (animation.delay > 0) {
				animation.delay -= frameTime;
				break;
			}

			if (animation instanceof AnimationModel) {
				animation.time += frameTime;
				let progress = animation.time / animation.timeLength;
				if (progress > 1) progress = 1;
				if (animation.onUpdate) animation.onUpdate(progress);
				if (progress === 1) this.remove(index, true);
			} else
			if (animation instanceof AnimationAbstract) {
				if (animation._canRemove)
					this.stack.splice(index, 1)
				else
					animation.update(frameTime);
			}
		}
	}
}
