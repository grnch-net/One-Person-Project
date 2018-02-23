import { GraphicPath } from "./../graphic/graphic-path";
import { Camera } from "./../scene/camera";
import { easyHTML } from "../../utils/easy-html";

interface ISVGPath {
	element: HTMLElement;
}

export class SVGPath extends GraphicPath implements ISVGPath {
	public element: HTMLElement = easyHTML.createElement({ type: 'path' });

	public rendering(camera: Camera): boolean {
		if (!super.rendering(camera)) return false;

		let define: string = '';

		let startPoint;
		if (this.children[1]) {
			startPoint = this.children[1].viewPosition;
			define += `M ${startPoint.toString()}`;
		} else {
			return true;
		}

		let length = this.children.length;
		for(let i=4; i<length; i+=3) {
			let p0 = this.children[i].viewPosition;
			let p1 = this.children[i-2].viewPosition;
			let p2 = this.children[i-1].viewPosition;
			define += ` C ${p1.toString()} ${p2.toString()} ${p0.toString()}`;
		}

		if (this.closePath) {
			let p0 = startPoint;
			let p1 = this.children[length-1].viewPosition;
			let p2 = this.children[0].viewPosition;
			define += ` C ${p1.toString()} ${p2.toString()} ${p0.toString()}`;
		}

		easyHTML.setAttribute(this.element, { 'd': define });

		return true;
	}
}
