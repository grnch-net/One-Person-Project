export abstract class ObjectOriented {
	classMix(parentClass: any, objectInterfaces: any) {
	    let newClass = class extends parentClass { };
	    let mix = (objectInterface: any) => Object.getOwnPropertyNames(objectInterface.prototype)
		.forEach(name => { newClass.prototype[name] = objectInterface.prototype[name]; });
	    if (Array.isArray(objectInterfaces)) objectInterfaces.forEach(mix);
	    else mix(objectInterfaces);
	    return newClass;
	}
}
