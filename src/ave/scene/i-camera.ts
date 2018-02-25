import { IUserInterface } from "./../graphic/user-interface";
import { IPoint } from "./../graphic/point";

export interface ICamera {
	scene: any;
	horizontPoint: IPoint;
	UI: IUserInterface;

	renderPoint(position: IPoint): number[];
}
