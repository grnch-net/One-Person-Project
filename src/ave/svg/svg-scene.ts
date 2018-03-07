import { GraphicType } from './../config';
import { SceneAbstract, ISceneAbstractParameters } from './../scene/scene-abstract';
import { ISVGGroup } from './svg-group';
import { ISVGObject } from './svg-object';
import { World } from "./../graphic/world";
import { easyHTML } from "../../utils/easy-html";
import { easyEvent } from "../../utils/easy-event";

export interface ISceneSVG {
	// newChildIndex: Object;
	addElement(graphicObject: any, parent: ISVGGroup, index: number): number;
}

// TODO: create and change this(let ave) to config
let ave = { config: { type: {
	GROUP: 'group',
	GRAPHIC: 'graphic',
	SPRITESHEET: 'spritesheet',
	FILTER: 'filter',
	GRADIENT: 'gradient'
}}};

export class SceneSVG extends SceneAbstract implements ISceneSVG {
	// public newChildIndex: Object;

	// protected prefabs: Prefabs;

	constructor(parameters: ISceneAbstractParameters) {
		super(parameters);

		if (!this.element) return;

        // this.initChildIndexing();

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
				// TODO: check FF
				width: this.scene_width-1, // -1 : fix FF
				height: this.scene_height,
				viewBox: '0 0 '+this.scene_width+' '+this.scene_height,
				xmlns: easyHTML.svgns
			}
        });
    }

	// protected initChildIndexing() {
    //     let _scene = this;
    //     this.newChildIndex = {
    //         get group() {
    //             return _scene.searchFreeIndex(ave.config.type.GROUP);
    //         },
    //         get graphic() {
	// 			return _scene.searchFreeIndex(ave.config.type.GRAPHIC);
    //         },
	// 		get spriteSheet() {
	// 			return _scene.searchFreeIndex(ave.config.type.SPRITESHEET);
	// 		},
	// 		get filter() {
	// 			return _scene.searchFreeIndex(ave.config.type.FILTER);
	// 		},
	// 		get gradient() {
	// 			return _scene.searchFreeIndex(ave.config.type.GRADIENT);
	// 		},
    //     };
    // }

	// private searchFreeIndex(key: string): number {
	// 	let ind: number = 0;
	//
	// 	while (this.childrenList[key+'-'+ind] !== undefined) {
	// 		ind++;
	// 	}
	//
	// 	return ind;
	// }

	protected createWorld(): void {
		super.createWorld();
		// this.world.position.set(this.scene_width / 2, this.scene_height / 2);

        // this.element.appendChild(this.world.element);
    }

	public updateDOM(): void {
		let scene = this.element;

		while (scene.lastChild) {
			scene.removeChild(scene.lastChild);
		}

		this.world.children.forEach( (child: any) => this.addSceneElement(child, scene) );
	}

	protected addSceneElement(anyGraphic: any, scene: HTMLElement): void {
		if (anyGraphic.type == GraphicType.OBJECT) {
			scene.appendChild(anyGraphic);
		} else
		if (anyGraphic.type == GraphicType.GROUP) {
			anyGraphic.children.forEach( (child: any) => this.addSceneElement(child, scene) );
		}
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