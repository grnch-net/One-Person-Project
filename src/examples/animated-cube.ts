import { AVE } from "../ave/ave";

export function animatedCube(): void {
	let scene = new AVE.Scene({ width: 800, height: 600});
	(window as any).scene = scene;

	let animator = scene.animator;

	let group = new AVE.GraphicGroup();
	group.position.set(0, 0, -300);
	// group.scale.set(1.5, 1.5, 1.5);
	group.rotation.set(30, 30, 30);
	scene.world.addChild(group);

	let createSquare = (color: string = 'black', name: string = 'square') => {
		let square = new AVE.GraphicPath();
		square.name = name;
		square.addPoint([-50, 50])
			.addPoint([50, 50])
			.addPoint([50, -50])
			.addPoint([-50, -50])
			.closePath = true;
		square.style.fill = color;
		group.addChild(square);
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


	// scene.render();
	scene.animator.add(0, {
		loop: true,
		onUpdate: (p: number) => scene.render()
	});

	(window as any).cubeGroup = group;

	let duration = 5000;
	let animOptions = { loop: true, yoyo: true };

	group.animation.add(duration *2, { loop: true, }, { rotation: { x: 360 +30, y: 360 +30, z: 360 +30} });
	group.animation.add(duration, animOptions, { scale: { x: 0.5, y: 0.5, z: 0.5} });

	figure[0].animation.add(duration, animOptions, { position: { z: -200 }})
	figure[1].animation.add(duration, animOptions, { position: { z: 200 }})
	figure[2].animation.add(duration, animOptions, { position: { x: -200 }})
	figure[3].animation.add(duration, animOptions, { position: { x: 200 }})
	figure[4].animation.add(duration, animOptions, { position: { y: -200 }})
	figure[5].animation.add(duration, animOptions, { position: { y: 200 }})

}
