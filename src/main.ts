console.info('%c Version: 51 ', 'background: #232627; color: #bada55');

import { AVE } from "./ave/ave";

(window as any).AVE = AVE;

let scene = new AVE.Scene({ width: 800, height: 600});
(window as any).scene = scene;

let animator = scene.animator;

let path = new AVE.GraphicPath();
path.addPoint([0, 100])
	.addPoint([100, 0])
	.addPoint([0, 0]);
path.closePath = true;

let group = new AVE.GraphicGroup();
group.position.set(0, 100);
group.scale.set(2, 1);
group.rotation.set(0, 0, 0);
scene.world.addChild(group);
group.addChild(path);

scene.render();
console.log(path.element, path);


let anim = () => animator.add(10000, {
	onUpdate: (p) => {
		group.rotation.y = 360 * p;
		scene.render();
	},
	onComplete: anim
});
anim();
