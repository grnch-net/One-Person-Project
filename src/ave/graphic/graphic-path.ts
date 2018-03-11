import { GraphicType } from "./../config";
import { GraphicParent, IGraphicParent } from "./graphic-parent";
import { GraphicPoint } from "./graphic-point"

interface IGraphicPath {
	addPoint(p0: number[], p1?: number[], p2?: number[]): void;

	children: GraphicPoint[];
	closePath: boolean;
}

export class GraphicPath extends GraphicParent implements IGraphicPath {
	public type: GraphicType = GraphicType.OBJECT;
	public children: GraphicPoint[] = [];
	public closePath: boolean = false;

	public addPoint(p0: number[], p1: number[] = null, p2: number[] = null): GraphicPath {
		if (p2) this.createPoint(...p2);
		else this.children.push(null);

		this.createPoint(...p0);

		if (p1) this.createPoint(...p1);
		else this.children.push(null);

		return this;
	}

	protected createPoint(x?: number, y?: number, z?: number): void {
		let newPoint = new GraphicPoint();
		newPoint.parent = this;
		newPoint.position.set(x, -y, z);
		this.children.push( newPoint );
	}


}
