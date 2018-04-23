import { GraphicObject, IGraphicObject } from "./graphic-object";
import { Camera } from "./../scene/camera";
import { GraphicType } from "./../config";

export interface IGraphicParent extends IGraphicObject {
	moveGlobalPosition(x: number, y: number, z: number): void;
	updateChildren(): GraphicParent;

	children: any[];
}

export abstract class GraphicParent extends GraphicObject implements IGraphicParent {
	public children: any[] = [];

	public updateChildren(): GraphicParent {
		this.children.forEach((child) => {
			if (!child) return;
			child.update(true);
		});
		return this;
	}


	protected updateLocalRotation(): void {
		super.updateLocalRotation();
		this.updateChildren();
	}

	protected updateLocalScale(): void {
		super.updateLocalScale();
		this.updateChildren();
	}

	public update(haveParnet: boolean = !!this.parent): boolean {
		if ( super.update(haveParnet) ) {
			this.updateChildren();
			return true;
		}

		return false;
	}

	protected updateLocalPosition() {
		// save old position data
		let move = {
			x: this.globalPosition.x,
			y: this.globalPosition.y,
			z: this.globalPosition.z
		};
		// update postion
		super.updateLocalPosition();
		// calculate move
		move.x = this.globalPosition.x - move.x;
		move.y = this.globalPosition.y - move.y;
		move.z = this.globalPosition.z - move.z;
		// update children
		this.moveChildren(move.x, move.y, move.z);
	}

	public moveGlobalPosition(x: number, y: number, z: number): void {
		super.moveGlobalPosition(x, y, z);
		this.moveChildren(x, y, z);
	}

	protected moveChildren(x: number, y: number, z: number): void {
		x *= this.scale.x;
		y *= this.scale.y;
		z *= this.scale.x;

		// let matrix = this.globalRotation;
		// x = x*matrix[0].x + y*matrix[1].x + z*matrix[2].x;
		// y = x*matrix[0].y + y*matrix[1].y + z*matrix[2].y;
		// z = x*matrix[0].z + y*matrix[1].z + z*matrix[2].z;

		let point = this.quaternion.vectorRotate({x, y, z});

		this.children.forEach((child) => {
			if (!child) return;
			child.moveGlobalPosition(point.x, point.y, point.z)
		});
	}

	public rendering(camera: Camera): boolean {
		if (super.rendering(camera) ) {
			// TODO: code review
			if (this.type == GraphicType.OBJECT) {
				let zIndex: number;
				this.children.forEach((child) => {
					if (!child) return;
					child.rendering(camera)
					zIndex = child.globalPosition.z;
				});
				if (zIndex !== undefined) {
					camera.addToViewQueue(zIndex, this);
				}
			} else {
				this.children.forEach((child) => {
					if (!child) return;
					child.rendering(camera)
				});
			}
			return true;
		}

		return false;
	}

}
