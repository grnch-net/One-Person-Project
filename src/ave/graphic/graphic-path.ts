import { GraphicPoint } from "./graphic-point"
import { GraphicObject } from "./graphic-object";
import { IPoint } from "./point";

interface IGraphicPath {
	addPoint(p0: number[], p1?: number[], p2?: number[]): GraphicPath;
}

export class GraphicPath extends GraphicObject implements IGraphicPath {
	public addPoint(p0: number[], p1: number[], p2: number[]): GraphicPath {
		this.children.push( this.createPoint(...(p2 || p0)) );
		this.children.push( this.createPoint(...p0) );
		this.children.push( this.createPoint(...(p1 || p0)) );

		return this;
	}

	protected createPoint(x?: number, y?: number, z?: number): GraphicPoint {
		let newPoint = new GraphicPoint();
		newPoint.parent = this;
		(newPoint.position as IPoint).set(x, y, z);
		return newPoint;
	}


}
