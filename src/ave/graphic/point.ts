interface IPoint {
	x: number;
	y: number;
	z: number;
	update: Function;
	set(x: number, y: number, z?: number): void;
}

export class Point implements IPoint {
	public x: number = 0;
	public y: number = 0;
	public z: number = 0;

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
			update = ()=>{};
		} else {
			Object.defineProperty(this, 'x', {
				get: (): number => { return this._x },
				set: (value: number) => { this._x = value; this.update(); }
			});
			Object.defineProperty(this, 'y', {
				get: (): number => { return this._y },
				set: (value: number) => { this._y = value; this.update(); }
			});
			Object.defineProperty(this, 'z', {
				get: (): number => { return this._z },
				set: (value: number) => { this._z = value; this.update(); }
			});
			this.set = this.setAndUpdate;
			this.rotate = this.rotateAndUpdate;
			this.scale = this.scaleAndUpdate;
		}
	}

	protected setAndUpdate(x: number, y: number, z: number = null): Point {
		this._x = x;
		this._y = y;
		if (z !== null) this._z = z;
		this.update();
		return this;
	}

	public set(x: number, y: number, z: number = null): Point {
		this.x = x;
		this.y = y;
		if (z !== null) this.z = z;
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
		this.update();
		return this;
	}

	public rotate(x: number = 0, y:number = 0, z: number = 0): Point {
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

	protected rotate2d(p: number[], gradus: number): number[] {
		let r = Math.PI / 180 * -gradus;
		let sin = Math.sin(r);
		let cos = Math.cos(r);
		return [
			Math.round( (p[0]*cos - p[1]*sin) *100 ) /100,
			Math.round( (p[0]*sin + p[1]*cos) *100 ) /100
		];
	}

	protected scaleAndUpdate(x: number = 1, y:number = 1, z: number = 1): Point {
		this._x *= x;
		this._y *= y;
		this._z *= z;
		this.update();
		return this;
	}

	public scale(x: number = 1, y:number = 1, z: number = 1): Point {
		this.x *= x;
		this.y *= y;
		this.z *= z;
		return this;
	}

	protected moveAndUpdate(x: number = 0, y:number = 0, z: number = 0): Point {
		this._x += x;
		this._y += y;
		this._z += z;
		this.update();
		return this;
	}

	public move(x: number = 0, y:number = 0, z: number = 0): Point {
		this.x += x;
		this.y += y;
		this.z += z;
		return this;
	}
}
