export const enum DimensionType {
	'2D' = 2,
	'3D' = 3
};

export const enum GraphicType {
	GROUP,
	OBJECT
};

export const Default = {
	scene: {
		dimension: DimensionType['3D'],
		scene_width: 800,
		scene_height: 600
	}
}