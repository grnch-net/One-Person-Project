console.info('%c Version: 79 ', 'background: #232627; color: #bada55');

import { AVE } from "./ave/ave";

(window as any).AVE = AVE;

let scene = new AVE.Scene({ width: 800, height: 600});
(window as any).scene = scene;

let animator = scene.animator;

let group = new AVE.GraphicGroup();
group.position.set(0, 0);
group.scale.set(1, 1);
group.rotation.set(0, 30, 0);
scene.world.addChild(group);

let createSquare = (color: string = 'black', name: string = 'square') => {
	let square = new AVE.GraphicPath();
	square.name = name;
	square.addPoint([-50, 50])
	.addPoint([50, 50])
	.addPoint([50, -50])
	.addPoint([-50, -50]);
	square.closePath = true;
	group.addChild(square);
	square.element.setAttributeNS(null, 'fill', color);
	return square;
}

let figure: any[] = [];

figure[0] = createSquare('OrangeRed');
figure[0].position.z = -150;

figure[1] = createSquare('cyan');
figure[1].position.z = 150;

figure[2] = createSquare('lime');
figure[2].rotation.y = 90;
figure[2].position.x = -150;

figure[3] = createSquare('DeepPink');
figure[3].rotation.y = 90;
figure[3].position.x = 150;

figure[4] = createSquare('magenta');
figure[4].rotation.x = 90;
figure[4].rotation.y = 90;
figure[4].position.y = 150;

figure[5] = createSquare('yellow');
figure[5].rotation.x = 90;
figure[5].position.y = -150;

scene.render();


let anim = () => animator.add(10000, {
	onUpdate: (p) => {
		group.rotation.x = 360 * p +30;
		group.rotation.y = 360 * p +30;
		group.rotation.z = 360 * p +30;

		let easeBack = Math.abs(1 - 2*p);
		figure[0].position.z = -150 * easeBack -52;
		figure[1].position.z =  150 * easeBack +52;
		figure[2].position.x = -150 * easeBack -52;
		figure[3].position.x =  150 * easeBack +52;
		figure[4].position.y =  150 * easeBack +52;
		figure[5].position.y = -150 * easeBack -52;

		scene.render();
	},
	onComplete: anim
});
anim();
