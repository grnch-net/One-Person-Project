export interface IPoint extends IVector3d {
	update: Function;
	set(x: number, y: number, z?: number): Point;
	rotate(x: number, y: number, z?: number): Point;
	scale(x: number, y: number, z?: number): Point;
	move(x: number, y: number, z?: number): Point;
	copy(point: IVector3d): Point;

	_set(x: number, y: number, z?: number): Point;
	_rotate(x: number, y: number, z?: number): Point;
	_scale(x: number, y: number, z?: number): Point;
	_move(x: number, y: number, z?: number): Point;
	_copy(point: IVector3d): Point;
}

export interface IVector3d {
	x: number;
	y: number;
	z: number;
}

export class Point implements IPoint {
	public x: number;
	public y: number;
	public z: number;

	constructor(
		public update: Function = null,
		protected _x: number = 0,
		protected _y: number = 0,
		protected _z: number = 0
	) {

		if (update === null) {
			this.x = _x;
			this.y = _y;
			this.z = _z;

			delete this._x;
			delete this._y;
			delete this._z;
			delete this.update;

			this.set = this._set;
			this.rotate = this._rotate;
			this.scale = this._scale;
			this.move = this._move;
			this.copy = this._copy;

			delete this.setAndUpdate;
			delete this.rotateAndUpdate;
			delete this.scaleAndUpdate;
			delete this.copyAndUpdate;
		} else {
			Object.defineProperty(this, 'x', {
				get: (): number => { return this._x },
				set: (value: number) => { this._x = value; this.update(this); }
			});
			Object.defineProperty(this, 'y', {
				get: (): number => { return this._y },
				set: (value: number) => { this._y = value; this.update(this); }
			});
			Object.defineProperty(this, 'z', {
				get: (): number => { return this._z },
				set: (value: number) => { this._z = value; this.update(this); }
			});
			this.set = this.setAndUpdate;
			this.rotate = this.rotateAndUpdate;
			this.scale = this.scaleAndUpdate;
			this.copy = this.copyAndUpdate;
		}
	}

	public set(x: number, y: number, z: number = null): Point { return this; }
	public _set(x: number, y: number, z: number = null): Point {
		this.x = x;
		this.y = y;
		if (z !== null) this.z = z;
		return this;
	}
	protected setAndUpdate(x: number, y: number, z: number = null): Point {
		this._x = x;
		this._y = y;
		if (z !== null) this._z = z;
		this.update(this);
		return this;
	}

	public rotate(x: number = 0, y: number = 0, z: number = 0): Point { return this; }
	public _rotate(x: number = 0, y:number = 0, z: number = 0): Point {
		if (z) {
			let axisZ = this.rotate2d([this.x, this.y], z);
			this.x = axisZ[0];
			this.y = axisZ[1];
		}
		if (y) {
			let axisY = this.rotate2d([this.x, this.z], y);
			this.x = axisY[0];
			this.z = axisY[1];
		}
		if (x) {
			let axisX = this.rotate2d([this.z, this.y], x);
			this.z = axisX[0];
			this.y = axisX[1];
		}
		return this;
	}
	protected rotateAndUpdate(x: number = 0, y:number = 0, z: number = 0): Point {
		if (z) {
			let axisZ = this.rotate2d([this._x, this._y], z);
			this._x = axisZ[0];
			this._y = axisZ[1];
		}
		if (y) {
			let axisY = this.rotate2d([this._x, this._z], y);
			this._x = axisY[0];
			this._z = axisY[1];
		}
		if (x) {
			let axisX = this.rotate2d([this._z, this._y], x);
			this._z = axisX[0];
			this._y = axisX[1];
		}
		this.update(this);
		return this;
	}

	protected rotate2d(p: number[], gradus: number): number[] {
		let r = Math.PI / 180 * -gradus;
		let sin = Math.sin(r);
		let cos = Math.cos(r);
		return [
			Math.round( (p[0]*cos - p[1]*sin) *100 ) /100,
			Math.round( (p[0]*sin + p[1]*cos) *100 ) /100
		];
	}

	public scale(x: number = 1, y: number = 1, z: number = 1): Point { return this; }
	public _scale(x: number = 1, y: number = 1, z: number = 1): Point {
		this.x *= x;
		this.y *= y;
		this.z *= z;
		return this;
	}
	protected scaleAndUpdate(x: number = 1, y: number = 1, z: number = 1): Point {
		this._x *= x;
		this._y *= y;
		this._z *= z;
		this.update(this);
		return this;
	}

	public move(x: number = 0, y: number = 0, z: number = 0): Point { return this; }
	public _move(x: number = 0, y: number = 0, z: number = 0): Point {
		this.x += x;
		this.y += y;
		this.z += z;
		return this;
	}
	protected moveAndUpdate(x: number = 0, y: number = 0, z: number = 0): Point {
		this._x += x;
		this._y += y;
		this._z += z;
		this.update(this);
		return this;
	}

	public copy(point: IVector3d): Point { return this; };
	public _copy(point: IVector3d): Point {
		this.x = point.x;
		this.y = point.y;
		this.z = point.z;
		return this;
	}
	protected copyAndUpdate(point: Point): Point {
		this._x = point.x;
		this._y = point.y;
		this._z = point.z;
		this.update(this);
		return this;
	}

	// public invers() {}
}
