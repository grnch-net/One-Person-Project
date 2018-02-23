console.info('%c Version: 50 ', 'background: #232627; color: #bada55');

import { AVE } from "./ave/ave";
import { Quaternion } from "./ave/graphic/quaternion";

(window as any).AVE = AVE;

let scene = new AVE.Scene({ width: 800, height: 600});
(window as any).scene = scene;

let path = new AVE.GraphicPath();
path.addPoint([0, 10], [5, 10])
	.addPoint([10, 0], null, [10, 5])
	.addPoint([0, 0]);
path.closePath = true;

scene.world.addChild(path);
scene.render();
console.log(path.element, path);
