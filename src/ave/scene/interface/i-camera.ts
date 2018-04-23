import { IUserInterface } from "./../../graphic/user-interface";
import { IPoint } from "./../../graphic/point";

export interface ICamera {
	scene: any;
	horizontPoint: IPoint;
	UI: IUserInterface;
	viewQueue: any;

	clearViewQueue(): void;
	addToViewQueue(zIndex: number, graphicObject: any): void;
	renderPoint(position: IPoint): number[];
}
