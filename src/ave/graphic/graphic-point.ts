import { Point } from "./point";

interface IGraphicPoint {
	globalPosition: Point;
	position: Point;
	update(haveParnet: boolean): void;
	parent?: any;
}

export class GraphicPoint {
	public globalPosition: Point = new Point();
	public position: Point = new Point( this.update.bind(this) );
	public parent: any;

	public update(haveParnet: boolean = null): boolean {
		// new local position
		this.globalPosition.set(this.position.x, this.position.y, this.position.z);

		if ( (haveParnet !== null && !haveParnet) || !this.parent) return false;

		// new local position from global parent scale
		let scale = this.parent['globalScale'];
		this.globalPosition.scale(scale.x, scale.y, scale.z);

		// new local position from global parent rotation
		let position = this.globalPosition;
		let rotate = this.parent['globalRotation'];
		this.globalPosition.set(
			position.x * rotate.axisX.x + position.y * rotate.axisY.x + position.z * rotate.axisZ.x,
			position.x * rotate.axisX.y + position.y * rotate.axisY.y + position.z * rotate.axisZ.y,
			position.x * rotate.axisX.z + position.y * rotate.axisY.z + position.z * rotate.axisZ.z
		);

		// new global position from global parent position
		let move = this.parent['globalPosition'];
		this.globalPosition.move(move.x, move.y, move.z);

		return true;
	}

}
