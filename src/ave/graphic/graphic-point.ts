import { Point } from "./point";

interface IGraphicPoint {
	globalPosition: Point;
	position: Point;
	update(): void;
	parent: any;
}

export class GraphicPoint {
	public globalPosition: Point = new Point();
	public position: Point = new Point(this.update);
	public parent: any;

	// TODO: Need optimization
	public update(): void {
		// new local position
		this.globalPosition.set(this.position.x, this.position.y, this.position.z);

		// new local position from global parent scale
		let scale = this.parent['globalScale'];
		this.globalPosition.scale(scale.x, scale.y, scale.z);

		// new local position from global parent rotation
		let rotation = this.parent['globalRotation'];
		this.globalPosition.rotate(rotation.x, rotation.y, rotation.z);

		// new global position from global parent position
		let move = this.parent['globalPosition'];
		this.globalPosition.move(move.x, move.y, move.z);
	}

}
