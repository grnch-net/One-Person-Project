import { Animator } from "./animator/animator";
import { AnimationGroup } from "./animator/animation-group";
import { SceneSVG } from "./scene/scene-svg";
import { GraphicGroup } from "./graphic/graphic-group";
import { GraphicObject } from "./graphic/graphic-object";
import { SVGPath } from "./svg/svg-path";

export let AVE = {
	Animator,
	AnimationGroup,
	Scene: SceneSVG,
	GraphicGroup,
	GraphicObject,
	GraphicPath: SVGPath
};
