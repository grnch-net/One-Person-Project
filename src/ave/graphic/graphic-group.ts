import { GraphicObject } from "./graphic-object";

export interface IGraphicGroup {
	addChild(element: any, index?: number): IGraphicGroup;
	removeChild(element: any): any;
}

export class GraphicGroup extends GraphicObject implements IGraphicGroup {

	public addChild(graphicObject: GraphicObject, index: number = null): GraphicGroup {
		if (graphicObject.parent)
			(graphicObject.parent as GraphicGroup).removeChild(graphicObject);

		if (index !== null && index < this.children.length)
			this.children.splice(index, 0, graphicObject);
		else
			index = this.children.push(graphicObject) -1;

		graphicObject.parent = this;

		return this;
	}

	public removeChild(graphicObject: GraphicObject): GraphicGroup {
		let index = this.children.indexOf(graphicObject);

		if (index < 0) {
			console.warn('Element is missing on group.');
			return;
		}

		this.children.splice(index, 1);
		delete graphicObject.parent;

		return this;
	}
}
