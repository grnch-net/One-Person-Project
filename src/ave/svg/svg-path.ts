import { SVGObject } from "./svg-object";
import { GraphicPath } from "./../graphic/graphic-path";
import { Camera } from "./../scene/camera";
import { easyHTML } from "../../utils/easy-html";

interface ISVGPath {}

export class SVGPath extends SVGObject(GraphicPath) implements ISVGPath {
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
			let p0 = this.children[i-3];
			let p1 = this.children[i-2];
			let p2 = this.children[i-1];
			let p3 = this.children[i];
			define += this.generateDefinePath([
				p0? p0.viewPosition: null,
				p1? p1.viewPosition: null,
				p2? p2.viewPosition: null,
				p3? p3.viewPosition: null
			]);
		}

		if (this.closePath) {
			let p0 = this.children[length-2];
			let p1 = this.children[length-1];
			let p2 = this.children[0];
			let p3 = this.children[1];
			define += this.generateDefinePath([
				p0? p0.viewPosition : null,
				p1? p1.viewPosition : null,
				p2? p2.viewPosition: null,
				p3? p3.viewPosition: null
			]);
		}

		easyHTML.setAttribute(this.element, { 'd': define });

		return true;
	}

	protected generateDefinePath(p: number[][]): string {
		if (!p[1] && !p[2] && p[3]) return ` L ${p[3].toString()}`;

		if (!p[1]) p[1] = p[0];
		if (!p[2]) p[2] = p[3];
		return ` C ${p[1].toString()} ${p[2].toString()} ${p[3].toString()}`;
	}
}
