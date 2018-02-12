import { WorldAbstract, IWorldAbstract } from "./world-abstract";
import { GraphicGroupSVG } from "./graphic-group-svg";
import { GraphicObject } from "./graphic-object"

interface IWorldSVG {

}

// TODO: extends mix GraphicGroupSVG
export class WorldSVG extends GraphicGroupSVG implements IWorldAbstract, IWorldSVG {
	public readonly parent: GraphicObject;

	constructor() {
		super();
	}
}
applyMixins(WorldSVG, [WorldAbstract]);

function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
