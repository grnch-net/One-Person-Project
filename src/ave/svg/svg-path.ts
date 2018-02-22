import { GraphicPath } from "./../graphic/graphic-path";
import { Camera } from "./../scene/camera";
import { easyHTML } from "../../utils/easy-html";

interface ISVGPath {
	element: HTMLElement;
}

export class SVGPath extends GraphicPath implements ISVGPath {
	public element: HTMLElement = easyHTML.createElement({ type: 'path', });

	public rendering(camera: Camera): boolean {
		if (!super.rendering(camera)) return false;

		easyHTML.attr(this.element, { 'd': 'M 0 0' });

		return true;
	}
}
