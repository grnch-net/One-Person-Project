import { GraphicType } from "./../config";
import { GraphicParent, IGraphicParent } from "./graphic-parent";
import { GraphicPoint } from "./graphic-point"
import { IPoint } from "./point";

interface IGraphicPath {
	addPoint(p0: number[], p1?: number[], p2?: number[]): GraphicPath;

	children: GraphicPoint[];
	closePath: boolean;
}

export class GraphicPath extends GraphicParent implements IGraphicPath {
	public type: GraphicType = GraphicType.OBJECT;
	public children: GraphicPoint[] = [];
	public closePath: boolean = false;

	public addPoint(p0: number[], p1: number[] = null, p2: number[] = null): GraphicPath {
		this.createPoint( ...(p2 || p0) );
		this.createPoint( ...p0 );
		this.createPoint( ...(p1 || p0) );

		return this;
	}

	protected createPoint(x?: number, y?: number, z?: number): GraphicPoint {
		let newPoint = new GraphicPoint();
		newPoint.parent = this;
		(newPoint.position as IPoint).set(x, -y, z);
		this.children.push( newPoint );
		return newPoint;
	}


}
