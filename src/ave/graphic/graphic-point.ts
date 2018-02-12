import { Point } from "./point";

interface IGraphicPoint {
	globalPosition: Point;
	position: Point;
	update(): void;
	parent: any;
}

export class GraphicPoint {
	public globalPosition: Point = new Point();
	public position: Point = new Point(this.positionUpdate);
	public parent: any;

	protected positionUpdate(): void {}

	// TODO: Need optimization
	public update(): void {
		// new local position
		let x1 = this.position.x;
		let y1 = this.position.y;
		let z1 = this.position.z;

		// new local position from global parent rotation
		let rotation_Z = this.parent['globalRotation'].z;
		x1 = x1 * Math.cos(rotation_Z) - y1 * Math.sin(rotation_Z);
		y1 = x1 * Math.sin(rotation_Z) + y1 * Math.cos(rotation_Z);

		let rotation_Y = this.parent['globalRotation'].y;
		x1 = x1 * Math.cos(rotation_Y) - z1 * Math.sin(rotation_Y);
		z1 = x1 * Math.sin(rotation_Y) + z1 * Math.cos(rotation_Y);

		let rotation_X = this.parent['globalRotation'].x;
		y1 = y1 * Math.cos(rotation_X) - z1 * Math.sin(rotation_X);
		z1 = y1 * Math.sin(rotation_X) + z1 * Math.cos(rotation_X);

		// new local position from global parent scale
		let x2 =  x1 * this.parent.globalPosition.x;
		let y2 =  y1 * this.parent.globalPosition.x;
		let z2 =  z1 * this.parent.globalPosition.x;

		// new global position from global parent position
		let x3 =  x2 + this.parent.globalPosition.x;
		let y3 =  y2 + this.parent.globalPosition.x;
		let z3 =  z2 + this.parent.globalPosition.x;

		this.globalPosition.set(x3, y3, z3)
	}
}
