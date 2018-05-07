import { ISceneAbstract } from "./interface/i-scene-abstract";
import { Default, DimensionType } from "./../config";
import { Animator } from "./../animator/animator";
import { World } from "./../graphic/world";
import { Camera } from "./camera";
import { easyHTML } from "../../utils/easy-html";
import { easyEvent } from "../../utils/easy-event";

export interface ISceneAbstractParameters {
	width: number;
	height: number;
	nodeId?: string;
	dimension?: DimensionType;
}

export abstract class SceneAbstract implements ISceneAbstract {
	public element: HTMLElement;
	public animator: Animator;
	public mainCamera: Camera;
	public world: World;
	public scene_width: number = Default.scene.scene_width;
	public scene_height: number = Default.scene.scene_height;

	protected _dimension: DimensionType = Default.scene.dimension;

	constructor(parameters:ISceneAbstractParameters) {
		if (parameters.width)
			this.scene_width = parameters.width;
		if (parameters.height)
	        this.scene_height = parameters.height;
		if (parameters.dimension)
			this._dimension = parameters.dimension;

		if (parameters.nodeId)
			this.element = this.initScene(parameters.nodeId);
		else
			this.element = this.createScene();

		this.animator = new Animator({ active: true });
		this.mainCamera = new Camera(this);
		this.createWorld();
	}

	get dimension(): DimensionType { return this._dimension; }
	set dimension(value: DimensionType) {
		this._dimension = value;
	}

	protected initScene(nodeId: string): HTMLElement {
		let element: HTMLElement = document.getElementById(nodeId);
        if (!element) console.error(`Node element (${nodeId}) is undefined.`);
		return element;
	}

	protected createScene(): HTMLElement {
		console.error('Need to override this method.');
		return easyHTML.createElement();
    }

	protected createWorld(world: any = World): void {
		this.world = new world();
		this.world.scene = this;
		this.animator.addGroup(this.world.animation);
	}

	protected initEvents(): void {
		easyEvent.addEvent(window, 'Resize', (e:any) => this.onResize(e) );
		requestAnimationFrame( () => this.onResize() );
	}

	protected onResize(event: any = {}): void {
		let parent: any = this.element.parentNode;
		let clientWidth: number = Number(parent.clientWidth);
		let clientHeight: number = Number(parent.clientHeight);

		let widthProcent: number = this.scene_width * 100 / clientWidth;
		let heightProcent: number = this.scene_height * 100 / clientHeight;

		var bgProcent_Y: number = this.scene_height * 100 / this.scene_width;

		if (widthProcent < heightProcent) {
			this.element.setAttributeNS(null, 'height', '' + clientHeight);
			this.element.setAttributeNS(null, 'width', '' + (clientHeight * 100 / bgProcent_Y) );
		} else {
			this.element.setAttributeNS(null, 'width', '' + clientWidth);
			this.element.setAttributeNS(null, 'height', '' + (bgProcent_Y * clientWidth / 100) );
		}
	}

	public render(): void {
		this.mainCamera.clearViewQueue();
		this.world.rendering(this.mainCamera);
	}
}
