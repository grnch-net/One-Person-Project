import { DimensionType } from "./../config";
import { ICamera } from "./interface/i-camera";
import { GraphicPoint } from "./../graphic/graphic-point";
import { UserInterface } from "./../graphic/user-interface";
import { Point } from "./../graphic/point";

export class Camera extends GraphicPoint implements ICamera {
	public UI: UserInterface = new UserInterface();
	public horizontPoint: Point;
	public viewQueue: any[] = [];
	protected viewQueuePositions: number[] = [];

	constructor(
		public scene: any
	) {
		super();

		this.horizontPoint = new Point(null, scene.scene_width/2, scene.scene_height/2, 800);

		if (scene.dimension == DimensionType['3D'])
			this.renderPoint = this.renderPoint3D;
		else
			this.renderPoint = this.renderPoint2D;
	}

	public rendering(camera: Camera): boolean { return true }

	public addToViewQueue(z: number, graphicObject: any): void {
		let indexes = this.viewQueuePositions;
		let length = indexes.length;

		for (let i = 0; i < length; i++) {
			if (z > indexes[i]) {
				this.viewQueue.splice(i, 0, graphicObject);
				indexes.splice(i, 0, z);
				return;
			}
		}

		this.viewQueue.push(graphicObject);
		indexes.push(z);
	}

	public clearViewQueue(): void {
		this.viewQueue = [];
		this.viewQueuePositions = [];
	}

	public renderPoint(position: Point): number[] {
		return [];
	}

	protected renderPoint3D(position: Point): number[] {
		let horizont = this.horizontPoint;
		let multiply = 1 - position.z / horizont.z;
		return [
			(position.x - horizont.x) * multiply + horizont.x - this.globalPosition.x,
			(position.y - horizont.y) * multiply + horizont.y - this.globalPosition.y
		];
	}

	protected renderPoint2D(position: Point): number[] {
		return [
			position.x - this.globalPosition.x,
			position.y - this.globalPosition.y
		];
	}
}
