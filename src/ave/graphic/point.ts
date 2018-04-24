export interface IPoint extends IVector3d {
	set(x: number, y: number, z?: number): IPoint;
	rotate(x: number, y: number, z?: number): IPoint;
	scale(x: number, y: number, z?: number): IPoint;
	move(x: number, y: number, z?: number): IPoint;
	copy(point: IVector3d): IPoint;
}

export interface IPointWithUpdate extends IPoint {
	update: Function;
}

export interface IVector3d {
	x: number;
	y: number;
	z: number;
}


export function Point(update: Function = null, x: number = 0, y: number = 0, z: number = 0): IPoint | IPointWithUpdate {
	return (update === null)? _Point.bind(null, x, y, z) : _PointWithUpdate.bind(null, update, x, y, z);
}

function rotate2d(p: number[], gradus: number): number[] {
	let r = Math.PI / 180 * -gradus;
	let sin = Math.sin(r);
	let cos = Math.cos(r);
	return [
		Math.round( (p[0]*cos - p[1]*sin) *100 ) /100,
		Math.round( (p[0]*sin + p[1]*cos) *100 ) /100
	];
}

class _Point implements IPoint {
	constructor(
		public x: number,
		public y: number,
		public z: number,
	) {}

	public set(x: number, y: number, z: number = null): IPoint {
		this.x = x;
		this.y = y;
		if (z !== null) this.z = z;
		return this;
	}

	public rotate(x: number = 0, y:number = 0, z: number = 0): IPoint {
		if (z) {
			let axisZ = rotate2d([this.x, this.y], z);
			this.x = axisZ[0];
			this.y = axisZ[1];
		}
		if (y) {
			let axisY = rotate2d([this.x, this.z], y);
			this.x = axisY[0];
			this.z = axisY[1];
		}
		if (x) {
			let axisX = rotate2d([this.z, this.y], x);
			this.z = axisX[0];
			this.y = axisX[1];
		}
		return this;
	}

	public scale(x: number = 1, y: number = 1, z: number = 1): IPoint {
		this.x *= x;
		this.y *= y;
		this.z *= z;
		return this;
	}

	public move(x: number = 0, y: number = 0, z: number = 0): IPoint {
		this.x += x;
		this.y += y;
		this.z += z;
		return this;
	}

	public copy(point: IVector3d): IPoint {
		this.x = point.x;
		this.y = point.y;
		this.z = point.z;
		return this;
	}
}

class _PointWithUpdate implements IPointWithUpdate {
	public get x(): number { return this._x };
	public get y(): number { return this._y };
	public get z(): number { return this._z };

	public set x(value: number) { this._x = value; this.update(this); };
	public set y(value: number) { this._y = value; this.update(this); };
	public set z(value: number) { this._z = value; this.update(this); };

	constructor(
		public update: Function = null,
		protected _x: number = 0,
		protected _y: number = 0,
		protected _z: number = 0
	) {}

	public set(x: number, y: number, z: number = null): IPointWithUpdate {
		this._x = x;
		this._y = y;
		if (z !== null) this._z = z;
		this.update(this);
		return this;
	}

	public rotate(x: number = 0, y:number = 0, z: number = 0): IPointWithUpdate {
		if (z) {
			let axisZ = rotate2d([this._x, this._y], z);
			this._x = axisZ[0];
			this._y = axisZ[1];
		}
		if (y) {
			let axisY = rotate2d([this._x, this._z], y);
			this._x = axisY[0];
			this._z = axisY[1];
		}
		if (x) {
			let axisX = rotate2d([this._z, this._y], x);
			this._z = axisX[0];
			this._y = axisX[1];
		}
		this.update(this);
		return this;
	}

	public scale(x: number = 1, y: number = 1, z: number = 1): IPointWithUpdate {
		this._x *= x;
		this._y *= y;
		this._z *= z;
		this.update(this);
		return this;
	}

	public move(x: number = 0, y: number = 0, z: number = 0): IPointWithUpdate {
		this._x += x;
		this._y += y;
		this._z += z;
		this.update(this);
		return this;
	}

	public copy(point: IVector3d): IPointWithUpdate {
		this._x = point.x;
		this._y = point.y;
		this._z = point.z;
		this.update(this);
		return this;
	}
}
