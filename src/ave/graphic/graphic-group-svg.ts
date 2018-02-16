import { GraphicObject } from "./graphic-object";
import { GraphicGroupAbstract } from "./graphic-group-abstract";
import { easyHTML } from "../../utils/easy-html";

interface IGraphicGroupSVG {
	// element: HTMLElement;
}

export class GraphicGroupSVG extends GraphicGroupAbstract implements IGraphicGroupSVG {
	// public element: HTMLElement = easyHTML.createElement({ type: 'g', });

	constructor() {
		super();

		delete this.addPoint;
	}
}
