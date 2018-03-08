import { SVGGroup } from "./svg-group";

export interface IWorld {}

export class SVGWorld extends SVGGroup implements IWorld {
	constructor() {
		super();
		delete this.parent;
	}
}
