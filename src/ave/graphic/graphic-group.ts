import { GraphicType } from "./../config";
import { GraphicParent, IGraphicParent } from "./graphic-parent";
import { GraphicObject, IGraphicObject } from "./graphic-object";

export interface IGraphicGroup extends IGraphicParent {
	addChild(element: any, index?: number): IGraphicGroup;
	removeChild(element: any): any;
}

export class GraphicGroup extends GraphicParent implements IGraphicGroup {
	public type: GraphicType = GraphicType.GROUP;
	public children: any[] = [];

	public addChild(graphicObject: any, index: number = null): GraphicGroup {
		if (graphicObject.parent)
			(graphicObject.parent as GraphicGroup).removeChild(graphicObject);

		if (index !== null && index < this.children.length)
			this.children.splice(index, 0, graphicObject);
		else
			index = this.children.push(graphicObject) -1;

		graphicObject.parent = this;

		return this;
	}

	public removeChild(graphicObject: any): GraphicGroup | null {
		let index = this.children.indexOf(graphicObject);

		if (index < 0) {
			console.warn('Element is missing on group.');
			return null;
		}

		this.children.splice(index, 1);
		graphicObject.parent = null;

		return this;
	}
}
