import { Point } from "./point";

export interface IGraphicPoint {
	globalPosition: Point;
	position: Point;
	updateGlobalPosition(haveParnet: boolean): void;
	moveGlobalPosition(x: number, y: number, z: number): void;
	parent?: any;
}

export class GraphicPoint implements IGraphicPoint {
	public globalPosition: Point = new Point();
	public position: Point = new Point( this.updateGlobalPosition.bind(this) );
	public parent: any;
	public name: string = '';

	public updateGlobalPosition(haveParnet: boolean = null): boolean {
		// new local position
		this.globalPosition.copy(this.position);

		// if ( (haveParnet !== null && !haveParnet) || !this.parent) return false;
		if (!this.parent) return false;

		// new local position from global parent scale
		let scale = this.parent['globalScale'];
		this.globalPosition.scale(scale.x, scale.y, scale.z);

		// new local position from global parent rotation
		let point = this.parent.quaternion.transform(this.globalPosition);
		this.globalPosition.copy(point);
		// let position = this.globalPosition;
		// let axisX = this.parent['globalRotation'].axisX;
		// let axisY = this.parent['globalRotation'].axisY;
		// let axisZ = this.parent['globalRotation'].axisZ;
		// this.globalPosition.set(
		// 	position.x * axisX.x + position.y * axisY.x + position.z * axisZ.x,
		// 	position.x * axisX.y + position.y * axisY.y + position.z * axisZ.y,
		// 	position.x * axisX.z + position.y * axisY.z + position.z * axisZ.z
		// );

		// new global position from global parent position
		let move = this.parent['globalPosition'];
		this.globalPosition.move(move.x, move.y, move.z);

		return true;
	}

	public update(haveParnet: boolean = null) {
		return this.updateGlobalPosition(haveParnet);
	}

	public moveGlobalPosition(x: number, y: number, z: number): void {
		this.globalPosition.move(x, y, z);
	}

}
