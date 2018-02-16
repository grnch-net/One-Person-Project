import { WorldAbstract, IWorldAbstract } from "./world-abstract";
import { GraphicGroupSVG } from "./graphic-group-svg";
import { GraphicObject } from "./graphic-object"

interface IWorldSVG {

}

export class WorldSVG extends classMix(GraphicGroupSVG, WorldAbstract) implements IWorldAbstract, IWorldSVG {
	constructor() {
		super();
		delete this.parent;
	}
}

function classMix(parentClass: any, objectInterfaces: any) {
    let newClass = class extends parentClass { };
    let mix = (objectInterface: any) => Object.getOwnPropertyNames(objectInterface.prototype)
	.forEach(name => { newClass.prototype[name] = objectInterface.prototype[name]; });
    if (Array.isArray(objectInterfaces)) objectInterfaces.forEach(mix);
    else mix(objectInterfaces);
    return newClass;
}
