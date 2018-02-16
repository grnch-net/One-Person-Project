import { GraphicObject } from "./graphic-object"
import { isUndefined } from "./../../utils/easy-check";

export interface IGraphicGroupAbstract {
	addChild(element: any, index?: number): number;
	removeChild(element: any): any;
}

export abstract class GraphicGroupAbstract extends GraphicObject implements IGraphicGroupAbstract {

	public addChild(element: any, index: number = null): number {
		if (element.parent) element.parent.removeChild(element);

		if (index !== null && index < this.children.length)
			this.children.splice(index, 0, element);
		else
			this.children.push(element);

		element.parent = this;

		return index;
	}

	public removeChild(element: any): any {
		let index = this.children.indexOf(element);

		if (index < 0) {
			console.warn('Element is missing on group.');
			return;
		}

		this.children.splice(index, 1);
		delete element.parent;

		return element;
	}
}
