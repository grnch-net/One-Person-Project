import { GraphicGroup } from "./graphic-group";

export interface IWorld {}

export class World extends GraphicGroup implements IWorld {
	constructor() {
		super();
		delete this.parent;
	}
}
