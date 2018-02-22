import { ICamera } from "./i-camera";
import { GraphicPoint } from "./../graphic/graphic-point";
import { UserInterface } from "./../graphic/user-interface";
import { Point } from "./../graphic/point";

export class Camera extends GraphicPoint implements ICamera {
	public UI: UserInterface = new UserInterface();
	public horizontPoint: Point;

	constructor(
		public scene: any
	) {
		super();

		this.horizontPoint = new Point(null, scene.scene_width/2, scene.scene_height/2, 800);
	}

	public rendering(camera: Camera): boolean { return true }
}
