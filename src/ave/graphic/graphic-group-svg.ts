import { GraphicGroupAbstract } from "./graphic-group-abstract";
import { easyHTML } from "../../utils/easy-html";

interface IGraphicGroupSVG {
	element: HTMLElement;
}

export class GraphicGroupSVG extends GraphicGroupAbstract implements IGraphicGroupSVG {
	public element: HTMLElement;

	 constructor() {
		 super();

		 this.element = this.createElement();
	 }

	 protected createElement(): HTMLElement {
         return easyHTML.createElement({
             type: 'g',
         });
     }
}
