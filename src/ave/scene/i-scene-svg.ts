export interface ISceneSVG {
	newChildIndex: Object;
	children: { [key: string]: any };
	// world: GraphicGroup;

	getHierarchy(): Object;
}
