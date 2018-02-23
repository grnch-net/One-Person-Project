import { GraphicPoint } from "./graphic-point"
import { GraphicObject } from "./graphic-object";
import { IPoint } from "./point";

interface IGraphicPath {
	closePath: boolean;
	addPoint(p0: number[], p1?: number[], p2?: number[]): GraphicPath;
}

export class GraphicPath extends GraphicObject implements IGraphicPath {
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
		(newPoint.position as IPoint).set(x, y, z);
		this.children.push( newPoint );
		return newPoint;
	}


}
