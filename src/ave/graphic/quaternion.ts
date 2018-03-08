import { IVector3d } from "./point";

interface IQuaternionObject extends IQuaternion {
	vectorRotate(v: IVector3d): IVector3d;
	multiplyEuler(x: number, y: number, z: number): void;
	setFromEuler(x: number, y: number, z: number): void;
	set(w: number, x: number, y: number, z: number, _n?: boolean): IQuaternionObject;
	copy(q: IQuaternion): IQuaternionObject;
	scale(value: number): IQuaternionObject;
	getMatrix(): number[][];
}

interface IQuaternion {
	x: number;
	y: number;
	z: number;
	w: number;
	_n?: boolean;
}

// interface IVector3d {
// 	x: number;
// 	y: number;
// 	z: number;
// }

export class Quaternion implements IQuaternionObject {
	public x: number = 0;
	public y: number = 0;
	public z: number = 0;
	public w: number = 1;
	public _n: boolean = true;

	constructor(
		x: number = null,
		y: number = null,
		z: number = null,
		angle: number = null
	) {
		if (arguments.length != 4) return;

		let v = this.vector_normalize(x, y, z);
		let a = this.gradusToRadian(angle);

		this.x = v.x * Math.sin(a/2);
		this.y = v.y * Math.sin(a/2);
		this.z = v.z * Math.sin(a/2);
		this.w = Math.cos(a/2);
	}

	protected gradusToRadian(value: number): number {
		return Math.PI/180 *value;
	}

	protected vector_normalize(x: number, y: number, z: number) {
		let l = (x**2 + y**2 + z**2)**0.5;

		// if (l == 0) return { x: 0, y: 0, z: 0 };

		return {
			x: x / l,
			y: y / l,
			z: z / l
	    };
	}

	protected normalize(q: IQuaternion): IQuaternion {
		let l = this.length(q);
		if (l == 0) {
			q.w = 0;
			q.x = 0;
			q.y = 0;
			q.z = 0;
		} else {
			q.w *= 1 / l;
			q.x *= 1 / l;
			q.y *= 1 / l;
			q.z *= 1 / l;
		}

		q._n = true;
		return q;
	}

	protected length(q: IQuaternion): number {
		return this.norm(q)**0.5;
	}

	protected norm(q: IQuaternion): number {
		return q.w**2 + q.x**2 + q.y**2 + q.z**2;
	}

	protected conjugate(q: IQuaternion): IQuaternion {
		q.x = -q.x;
		q.y = -q.y;
		q.z = -q.z;
		return q;
	}

	protected inverse(q: IQuaternion): IQuaternion {
		q = this.conjugate(q);
		let norm = this.norm(q);
		q.w /= norm;
		q.x /= norm;
		q.y /= norm;
		q.z /= norm;
		return q
	}

	protected quat_multiply_quat(a: IQuaternion, b: IQuaternion): IQuaternion {
		return {
			w: a.w*b.w - a.x*b.x - a.y*b.y - a.z*b.z,
			x: a.w*b.x + a.x*b.w + a.y*b.z - a.z*b.y,
			y: a.w*b.y - a.x*b.z + a.y*b.w + a.z*b.x,
			z: a.w*b.z + a.x*b.y - a.y*b.x + a.z*b.w,
			_n: a._n && b._n
		}
	}

	public multiply(a: IQuaternion): IQuaternion {
		if (!a._n) a = this.normalize(a);
		this.copy( this.quat_multiply_quat(a, this) );
		return this;
	}

	public vectorRotate(v: IVector3d): IVector3d {
		let t = this.quat_multiply_vector(this, v);
		let q: IQuaternion = {w: this.w, x: this.x, y: this.y, z: this.z, _n: true};
		q = this.inverse(q);

		t = this.quat_multiply_quat(t, q);
		return {
			x: t.x,
			y: t.y,
			z: t.z
		}
	}

	protected quat_multiply_vector(a: IQuaternion, b: IVector3d): IQuaternion {
		return {
			w: -a.x*b.x - a.y*b.y - a.z*b.z,
	    	x: a.w*b.x + a.y*b.z - a.z*b.y,
	    	y: a.w*b.y - a.x*b.z + a.z*b.x,
	    	z: a.w*b.z + a.x*b.y - a.y*b.x,
			_n: false
	    }
	}

	public set(w: number, x: number, y: number, z: number, _n: boolean = false): IQuaternionObject {
		this.w = w;
		this.x = x;
		this.y = y;
		this.z = z;
		this._n = _n;
		return this;
	}

	public copy(q: IQuaternion): IQuaternionObject {
		this.w = q.w;
		this.x = q.x;
		this.y = q.y;
		this.z = q.z;
		this._n = q._n;
		return this;
	}

	public scale(value: number): IQuaternionObject {
		this.w *= value;
		this.x *= value;
		this.y *= value;
		this.z *= value;
		return this;
	}

	public setFromSphericalAngles(latitude: number, longitude: number, angle: number): void {
		let sin_a    = Math.sin( angle / 2 )
	    let cos_a    = Math.cos( angle / 2 )

	    let sin_lat  = Math.sin( latitude )
	    let cos_lat  = Math.cos( latitude )

	    let sin_long = Math.sin( longitude )
	    let cos_long = Math.cos( longitude )

		this.copy({
	    	x: sin_a * cos_lat * sin_long,
	    	y: sin_a * sin_lat,
	    	z: sin_a * sin_lat * cos_long,
	    	w: cos_a
		});
	}

	public multiplyEuler(x: number, y: number, z: number): void {
		if (x) this.multiply(new Quaternion(1, 0, 0, x));
		if (y) this.multiply(new Quaternion(0, 1, 0, y));
		if (z) this.multiply(new Quaternion(0, 0, 1, z));
	}

	public setFromEuler(x: number, y: number, z: number): void {
		var q = new Quaternion();
		if (x) q.multiply(new Quaternion(1, 0, 0, x));
		if (y) q.multiply(new Quaternion(0, 1, 0, y));
		if (z) q.multiply(new Quaternion(0, 0, 1, z));

		this.copy(q);
	}

	public getMatrix(): number[][] {
		let m: number[][] = [ [], [], [] ];
		let x = this.x, y = this.y, z = this.z, w = this.w;
		let wx, wy, wz, xx, yy, yz, xy, xz, zz, x2, y2, z2;
		let s  = 2.0 / this.norm(this);
		x2 = x * s;    y2 = y * s;    z2 = z * s;
        xx = x * x2;   xy = x * y2;   xz = x * z2;
        yy = y * y2;   yz = y * z2;   zz = z * z2;
        wx = w * x2;   wy = w * y2;   wz = w * z2;

        m[0][0] = 1.0 - (yy + zz);
        m[1][0] = xy - wz;
        m[2][0] = xz + wy;

        m[0][1] = xy + wz;
        m[1][1] = 1.0 - (xx + zz);
        m[2][1] = yz - wx;

        m[0][2] = xz - wy;
        m[1][2] = yz + wx;
        m[2][2] = 1.0 - (xx + yy);

		return m;
	}

	public init_linear_interpolation(q: IQuaternion): IQuaternion {
		if (q._n) q = this.normalize(q);
		let inner: number = this.w * q.w + this.x * q.x + this.y * q.y + this.z * q.z;
		if (inner < 0) q = this.conjugate(q);
		q.w -= this.w;
		q.x -= this.x;
		q.y -= this.y;
		q.z -= this.z;
		return q;
	}

	public linear_interpolation(t: number, q: IQuaternion): IQuaternion {
		return {
			w: this.w + q.w * t,
			x: this.x + q.x * t,
			y: this.y + q.y * t,
			z: this.z + q.z * t,
			_n: true
		}
	}

	// TODO: add getEulers method
}
