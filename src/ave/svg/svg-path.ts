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

		if (this.children[1]) {
			define += `M ${this.children[1].viewPosition.toString()}`;
		} else {
			return true;
		}

		let length = this.children.length;
		for(let i=4; i<length; i+=3) {
			this.generateDefineElement([
				this.children[i-3].viewPosition,
				this.children[i-2].viewPosition,
				this.children[i-1].viewPosition,
				this.children[i].viewPosition
			]);
		}

		if (this.closePath) {
			this.generateDefineElement([
				this.children[length-2].viewPosition,
				this.children[length-1].viewPosition,
				this.children[0].viewPosition,
				this.children[1].viewPosition
			]);
		}

		easyHTML.setAttribute(this.element, { 'd': define });

		return true;
	}

	protected generateDefineElement(p: number[][]) {
		if (!p[1] && !p[2]) return ` L ${p[3].toString()}`;

		if (!p[1]) p[1] = p[0];
		if (!p[2]) p[2] = p[3];
		return ` C ${p[1].toString()} ${p[2].toString()} ${p[3].toString()}`;
	}
}
