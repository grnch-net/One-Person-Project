export const enum DimensionType {
	'2D' = 2,
	'3D' = 3
};

// let ave = { config: { type: {
// 	GROUP: 'group',
// 	GRAPHIC: 'graphic',
// 	SPRITESHEET: 'spritesheet',
// 	FILTER: 'filter',
// 	GRADIENT: 'gradient'
// }}};
export const enum GraphicType {
	GROUP,
	OBJECT
};

export const enum AnimationType {
	ANIMATOR,
	GROUP,
	MODEL,
	GRAPHIC_MODEL
};

export const Default = {
	scene: {
		dimension: DimensionType['3D'],
		scene_width: 800,
		scene_height: 600
	}
}
