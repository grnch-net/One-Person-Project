console.info('%c DEV Version: 84 ', 'background: #232627; color: #bada55');

import { AVE } from "./ave/ave";

(window as any).AVE = AVE;

let scene = new AVE.Scene({ width: 800, height: 600});
(window as any).scene = scene;

let animator = scene.animator;

let group = new AVE.GraphicGroup();
group.position.set(0, 0, 0);
group.scale.set(1, 1);
group.rotation.set(30, 30, 30);
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
figure[0].position.z = -50;

figure[1] = createSquare('cyan');
figure[1].position.z = 50;

figure[2] = createSquare('lime');
figure[2].rotation.y = 90;
figure[2].position.x = -50;

figure[3] = createSquare('DeepPink');
figure[3].rotation.y = 90;
figure[3].position.x = 50;

figure[4] = createSquare('yellow');
figure[4].rotation.x = 90;
figure[4].position.y = -50;

figure[5] = createSquare('magenta');
figure[5].rotation.x = 90;
figure[5].position.y = 50;

scene.render();

group.animation.add(10000, {
	onUpdate: (p: number) => scene.render()
}, {
	rotation: { x: 360 +30, y: 360 +30, z: 360 +30},
	// scale: { x: 2, y: 2, z: 2}
});

figure[0].animation
	.add(5000, {}, { position: { z: -200 }})
	.add(5000, {}, { position: { z: -50 }});
figure[1].animation
	.add(5000, {}, { position: { z: 200 }})
	.add(5000, {}, { position: { z: 50 }});
figure[2].animation
	.add(5000, {}, { position: { x: -200 }})
	.add(5000, {}, { position: { x: -50 }});
figure[3].animation
	.add(5000, {}, { position: { x: 200 }})
	.add(5000, {}, { position: { x: 50 }});
figure[4].animation
	.add(5000, {}, { position: { y: -200 }})
	.add(5000, {}, { position: { y: -50 }});
figure[5].animation
	.add(5000, {}, { position: { y: 200 }})
	.add(5000, {}, { position: { y: 50 }});
