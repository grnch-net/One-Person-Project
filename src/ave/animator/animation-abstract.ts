import { IAnimationAbstract, IAddParameters } from "./i-animation-abstract"
import { AnimationModel } from "./animation-model";
import { IAnimationGroup } from "./animation-group";

export abstract class AnimationAbstract implements IAnimationAbstract {
	protected stack: (AnimationModel | IAnimationGroup)[] = [];
	protected keyList: { [key: string]: AnimationModel } = {};

	constructor() {}

	public add(time: number = 0, parameters: IAddParameters): AnimationModel {
		if (parameters.process === undefined
			&& parameters.callback === undefined
		) {
			console.warn('Mindless animation.', parameters);
			return;
		}

		let model: AnimationModel = new AnimationModel({ ...parameters, timeLength: time });
		// let model: AnimationModel = new AnimationModel({
		// 	timeLength: time,
		// 	active: parameters.active,
		// 	delay: parameters.delay,
		// 	key: parameters.key,
		// 	process: parameters.process,
		// 	callback: parameters.callback
		// });

		let key = model.key;
		if (key) {
			if (this.keyList[key]) this.remove(this.keyList[key]);
			this.keyList[key] = model;
		}

		this.stack.push(model);

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

		if (playCallback && model.callback) model.callback();

		if (model.key)
			delete this.keyList[model.key];

			return model;
	}

	public timeout(callback: Function, time: number, active: boolean = true): AnimationModel {
		return this.add(time, { callback, active });
	}

	public addGroup(group: IAnimationGroup): IAnimationGroup {
		this.stack.push(group);
		return group;
	}

	public removeGroup(group: IAnimationGroup): IAnimationGroup {
		let index = this.stack.indexOf(group);

		if (index > -1)
			return this.stack.splice(index, 1)[0] as IAnimationGroup;
	}

	public createGroup(active: boolean = true) {
		// let group =  new AnimationGroup({ active: active });
		return { active } as IAnimationGroup;
	}

	public update(frameTime: number): void {
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
				if (animation.process) animation.process(progress);
				if (progress === 1) this.remove(index, true);
			} else
			if (animation instanceof AnimationAbstract) {
				animation.update(frameTime);
			}
		}
	}
}
