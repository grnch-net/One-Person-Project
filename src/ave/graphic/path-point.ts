import { GraphicPoint, IGraphicPoint } from "./graphic-point";

interface IPathPoint extends IGraphicPoint {
	beforePoint: GraphicPoint;
	afterPoint: GraphicPoint;
}

export class PathPoint extends GraphicPoint implements IPathPoint {
	public beforePoint: GraphicPoint;
	public afterPoint: GraphicPoint;

	constructor(p0: number[], p1: number[] = null, p2: number[] = null) {
		super();

		this.setPointPosition(this, ...p0);
		if (p1) {
			this.afterPoint = new GraphicPoint();
			this.setPointPosition(this.afterPoint, ...p1);
		}
		if (p2) {
			this.beforePoint = new GraphicPoint();
			this.setPointPosition(this.beforePoint, ...p2);
		}
	}

	protected setPointPosition(point: GraphicPoint, x?: number, y?: number, z?: number): void {
		point.position.set(x, y, z);
	}

	public update(haveParnet: boolean): boolean {
		haveParnet = super.update(haveParnet);
		// TODO: update children
		return haveParnet;
	}
}
