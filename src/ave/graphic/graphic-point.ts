import { Point } from "./point";
import { ICamera } from "./../scene/i-camera";

export interface IGraphicPoint {
	viewPosition: number[];
	globalPosition: Point;
	position: Point;
	parent?: any;

	update(haveParnet?: boolean): boolean;
	updateGlobalPosition(haveParnet: boolean): void;
	moveGlobalPosition(x: number, y: number, z: number): void;
	rendering(camera: ICamera): boolean;
}


export class GraphicPoint implements IGraphicPoint {
	public viewPosition: number[];
	public globalPosition: Point = new Point();
	public position: Point = new Point( this.updateGlobalPosition.bind(this) );
	public parent: any;
	public name: string = '';

	public updateGlobalPosition(haveParnet: boolean = !!this.parent): boolean {
		// new local position
		this.globalPosition.copy(this.position);

		if (!haveParnet) return false;

		// new local position from global parent scale
		let scale = this.parent['globalScale'];
		this.globalPosition.scale(scale.x, scale.y, scale.z);

		// new local position from global parent rotation
		// let point = this.parent.quaternion.transform(this.globalPosition);
		// this.globalPosition.copy(point);
		let position = this.globalPosition;
		let matrix = this.parent['globalRotation'];
		this.globalPosition.set(
			position.x * matrix[0].x + position.y * matrix[1].x + position.z * matrix[2].x,
			position.x * matrix[0].y + position.y * matrix[1].y + position.z * matrix[2].y,
			position.x * matrix[0].z + position.y * matrix[1].z + position.z * matrix[2].z
		);

		// new global position from global parent position
		let move = this.parent['globalPosition'];
		this.globalPosition.move(move.x, move.y, move.z);

		return true;
	}

	public update(haveParnet: boolean) {
		return this.updateGlobalPosition(haveParnet);
	}

	public moveGlobalPosition(x: number, y: number, z: number): void {
		this.globalPosition.move(x, y, z);
	}

	public rendering(camera: ICamera): boolean {
		this.updateView(camera);
		return true;
	}

	protected updateView(camera: ICamera) {
		this.viewPosition = camera.renderPoint(this.globalPosition);
	}

}
