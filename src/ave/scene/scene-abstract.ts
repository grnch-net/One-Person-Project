import { easyHTML } from "../../utils/easy-html";
import { easyEvent } from "../../utils/easy-event";

interface ISceneAbstract {
	element: HTMLElement;
	scene_width: number;
	scene_height: number;
}

export interface ISceneAbstractParameters {
	width: number;
	height: number;
	nodeId?: string;
}

export abstract class SceneAbstract implements ISceneAbstract {
	public element: HTMLElement;
	public scene_width: number;
	public scene_height: number;

	constructor(parameters:ISceneAbstractParameters) {
		this.scene_width = parameters.width;
        this.scene_height = parameters.height;

		if (parameters.nodeId)
            this.element = this.initScene(parameters.nodeId);
        else
            this.element = this.createScene();
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
}
