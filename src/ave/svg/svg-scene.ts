import { GraphicType } from './../config';
import { SceneAbstract, ISceneAbstractParameters } from './../scene/scene-abstract';
import { ISceneAbstract } from "./../scene/interface/i-scene-abstract";
import { SVGWorld } from "./svg-world";
import { easyHTML } from "../../utils/easy-html";
import { easyEvent } from "../../utils/easy-event";

export interface ISceneSVG extends ISceneAbstract {
	// updateDOM(): SceneSVG;
}

export class SceneSVG extends SceneAbstract implements ISceneSVG {
	// protected prefabs: Prefabs;
	protected isUpdateDOM: boolean = false;

	constructor(parameters: ISceneAbstractParameters) {
		super(parameters);

		if (!this.element) {
			console.warn('this.element is undefined');
			return;
		}


		// this.prefabs = new ave.Prefabs({
		// 	scene: this
		// });

        this.initEvents();
    }

	protected initScene(nodeId: string): HTMLElement {
		let element: HTMLElement = super.initScene(nodeId);
        if (element.nodeName.toLowerCase() != 'svg')
			console.error(`Node element (${nodeId}) is not SVG.`);

		return element;
	}

	protected createScene(): HTMLElement {
        return easyHTML.createElement({
            type: 'svg',
            parent: document.body,
			attr: {
				width: this.scene_width,
				height: this.scene_height,
				viewBox: '0 0 '+this.scene_width+' '+this.scene_height,
				xmlns: easyHTML.svgns
			}
        });
    }

	protected createWorld(): void {
		this.world = new SVGWorld();
		this.world.scene = this;
		this.world.position.set(this.scene_width / 2, this.scene_height / 2);
    }

	public render(): void {
		this.mainCamera.clearViewQueue();
		this.world.rendering(this.mainCamera);

		super.render();
		this.updateDOM();
	}

	protected updateDOM(): SceneSVG {
		if (this.isUpdateDOM == false) {
			this.isUpdateDOM = true;
			requestAnimationFrame( this.updateDOMAfterFrame.bind(this) );
		}

		return this;
	}

	protected updateDOMAfterFrame(): void {
		this.isUpdateDOM = false;
		let scene = this.element;
		let viewQueue = this.mainCamera.viewQueue;

		while (scene.lastChild) {
			scene.removeChild(scene.lastChild);
		}

		viewQueue.forEach( (graphicObject: any) => {
			scene.appendChild(graphicObject.element);
		});
	}

	// protected initEvents(): void {
	// 	super.initEvents();
	// 	easyEvent.addEvent(
	// 		this.element,
	// 		['Click','MouseOver','MouseOut','MouseDown','TouchEnd'],
	// 		this
	// 	);
    // }

	// protected onClick(event: any): void {
	// 	let targetId: string[] = event.target.id.split('+');
	//
	// 	if (targetId[0] === 'ave') {
	// 		let item = this.childrenList[ targetId[1] ];
	// 		if (item && item.events
	// 			&& item.events.click
	// 		) {
	// 			item.events.click();
	// 		}
	// 	}
	// }
	//
	// protected onMouseOver(event: any): void {
	// 	let targetId: string[] = event.target.id.split('+');
	//
	// 	if (targetId[0] === 'ave') {
	// 		let item = this.childrenList[ targetId[1] ];
	// 		if (item && item.events
	// 			&& item.events.mouseover
	// 		) {
	// 			item.events.mouseover();
	// 		}
	// 	}
	// }
	//
	// protected onMouseOut(event: any): void {
	// 	let targetId: string[] = event.target.id.split('+');
	//
	// 	if (targetId[0] === 'ave') {
	// 		let item = this.childrenList[ targetId[1] ];
	// 		if (item && item.events
	// 			&& item.events.mouseout
	// 		) {
	// 			item.events.mouseout();
	// 		}
	// 	}
	// }
	//
	// protected onMouseDown(event: any): void {
	// 	let targetId: string[] = event.target.id.split('+');
	//
	// 	if (targetId[0] === 'ave') {
	// 		let item = this.childrenList[ targetId[1] ];
	// 		if (item && item.events
	// 			&& item.events.mousedown
	// 		) {
	// 			item.events.mousedown();
	// 		}
	// 	}
	// }
	//
	// protected onTouchEnd(event: any): void {
	// 	let targetId: string[] = event.target.id.split('+');
	//
	// 	if (targetId[0] === 'ave') {
	// 		let item = this.childrenList[ targetId[1] ];
	// 		if (item
	// 			&& item.events
	// 			&& item.events.touchend
	// 		) {
	// 			item.events.touchend();
	// 		}
	// 	}
	// }



}


// ave.Scene = class {
// 	__appendChild(child) {
// 		this.world.element.appendChild(child.element);
// 	}
//
//     createGraphicGroup(param = {}) {
//         let newGroup = ave.interface.createGraphicGroup(this, param);
//         this.world.addChild(newGroup);
//         return newGroup;
//     }
//
//     createGraphic(param = {}) {
//         let newGraphic = ave.interface.createGraphic(this, param);
//         this.world.addChild(newGraphic);
//         return newGraphic;
//     }
//
//     createCircle(param = {}) {
//         let newCircle = ave.interface.createCircle(this, param);
//         this.world.addChild(newCircle);
//         return newCircle;
//     }
//
//     createRect(param = {}) {
//         let newRect = ave.interface.createRect(this, param);
//         this.world.addChild(newRect);
//         return newRect;
//     }
//
//     createText(param = {}) {
//         let newText = ave.interface.createText(this, param);
//         this.world.addChild(newText);
//         return newText;
//     }
//
//     createImage(param = {}) {
//         let newImage = ave.interface.createImage(this, param);
//         this.world.addChild(newImage);
//         return newImage;
//     }
//
//     createSpriteSheet(param = {}) {
//         let newSpriteSheet = ave.interface.createSpriteSheet(this, param);
//         this.world.addChild(newSpriteSheet);
//         return newSpriteSheet;
//     }
//
//     createForeignObject(param = {}) {
//         let newForeignObject = ave.interface.createForeignObject(this, param);
//         this.world.addChild(newForeignObject);
//         return newForeignObject;
//     }
//
//     createGradient(param = {}) {
//         let newGradient = new ave.Gradient({
//             scene: this,
// 			type: param.type,
// 			colors: param.colors
//         });;
//         this.prefabs.add(newGradient);
//         return newGradient;
//     }
//
//     createFilter(param = {}) {
//         let newFilter = new ave.Filter({
//             scene: this,
// 			type: param.type,
// 			spread: param.spread
//         });;
//         this.prefabs.add(newFilter);
//         return newFilter;
//     }
// }
