import { ISceneAbstract } from "./../scene/interface/i-scene-abstract";
import { IAnimationAbstract } from "./../animator/i-animation-abstract";

interface IGraphicAnimation {
	graphicObject: any;
	animator: IAnimationAbstract;

	add(time: number, parameters: IAddParameters): IGraphicAnimation;
}

interface IAddParameters {

}

export class GraphicAnimation implements IGraphicAnimation {
	public animator: IAnimationAbstract;

	constructor(
		public graphicObject: any
	) {}

	public add(time: number, parameters: IAddParameters): IGraphicAnimation {
		let animator = this.animator;
		let parent = this.graphicObject.parent;
		while (!animator && parent) {
			animator = parent.animation.animator;
			parent = parent.parent;
		}

		if (!animator) {
			console.warn('The graphic object must be on the stage.', this.graphicObject);
			return this;
		}

		// TODO: finishing animation;

		return this;
	}
}
