import { GraphicObject } from "./graphic-object"
import { GraphicGroupAbstract } from "./graphic-group-abstract";

export interface IWorldAbstract {
	readonly parent: GraphicObject;
}

export class WorldAbstract extends GraphicGroupAbstract implements IWorldAbstract {

	constructor() {
		super();
	}

}
