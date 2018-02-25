import { DimensionType } from "./../config";
import { Animator } from "./../animator/animator";
import { World } from "./../graphic/world";
import { Camera } from "./camera";

export interface ISceneAbstract {
	element: HTMLElement;
	animator: Animator;
	world: World;
	mainCamera: Camera;

	scene_width: number;
	scene_height: number;
	dimension: DimensionType;

	render(): void
}
