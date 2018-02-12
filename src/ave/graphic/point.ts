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
			this.set = this._set;
		}
	}

	public _set(x: number, y: number, z: number = null): void {
		this._x = x;
		this._y = y;
		if (z !== null) this._z = z;

		this.update();
	}

	public set(_x: number, _y: number, _z: number = null): void {
		this.x = _x;
		this.y = _y;
		if (_z !== null) this.z = _z;
	}
}
