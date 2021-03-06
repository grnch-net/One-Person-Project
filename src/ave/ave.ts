import { Animator } from "./animator/animator";
import { AnimationGroup } from "./animator/animation-group";
import { SceneSVG } from "./svg/svg-scene";
// import { GraphicGroup } from "./graphic/graphic-group";
import { SVGGroup } from "./svg/svg-group";
import { GraphicObject } from "./graphic/graphic-object";
import { SVGPath } from "./svg/svg-path";

export let AVE = {
	Animator,
	AnimationGroup,
	Scene: SceneSVG,
	GraphicGroup: SVGGroup,
	GraphicObject,
	GraphicPath: SVGPath
};
