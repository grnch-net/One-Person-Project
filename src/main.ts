console.info('%c Version: 48 ', 'background: #232627; color: #bada55');

import { AVE } from "./ave/ave";
import { Quaternion } from "./ave/graphic/quaternion";

(window as any).AVE = AVE;

let scene = new AVE.SceneSVG({ width: 800, height: 600});
(window as any).scene = scene;

let objectPoint = new AVE.GraphicObject();
objectPoint.name = 'point';
objectPoint.addPoint(10, 10, 0);

let graphicGroup = new AVE.GraphicGroup();
graphicGroup.name = 'group';
// graphicGroup.position.set(10,0,0);
graphicGroup.scale.set(2, 1, 1);
graphicGroup.rotation.set(0, 0, 90);
graphicGroup.addChild(objectPoint);

// scene.world.addChild(graphicGroup);
let p0 = objectPoint.children[0].globalPosition;
console.log('objectPoint', p0);
