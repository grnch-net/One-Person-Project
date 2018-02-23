## Installation:

```shell
npm install -g gulp-cli
```

```shell
npm install
```

## Build:

```shell
gulp
```

## Example:

#### Create scene:
````typescript
let scene = new AVE.Scene({ width: 800, height: 600});
````

#### Create animator and animation group:
````typescript
let animator = new Animator({ active: true });
let animationGroup = animator.createGroup();
````

#### Add animation & timeout:
````typescript
animator.timeout(()=>{
	animationGroup
	.add(1000, {
		onStart: () => { console.log('1'); },
		onComplete: () => { console.log('2'); }
	}).add(1000, {
		delay: 1000,
		onStart: () => { console.log('3'); },
		onComplete: () => { console.log('4'); }
	}).add(1000, {
		onUpdate: (progress) => {
			console.log('progress', progress);
		}
	});
}, 1000);
````

#### Create graphic group and transform:
````typescript
let graphicGroup = new AVE.GraphicGroup();
graphicGroup.name = 'group';
graphicGroup.position.set(10,0,0);
graphicGroup.scale.set(2, 1, 1);
graphicGroup.rotation.set(0, 0, 90);
scene.world.addChild(graphicGroup);
````

#### Create graphic object:
````typescript
let objectPoint = new AVE.GraphicObject();
objectPoint.name = 'point';
graphicGroup.addChild(objectPoint);
````


## External links:

#### The Matrix and Quaternions FAQ:
http://www.rossprogrammproduct.com/translations/Matrix%20and%20Quaternion%20FAQ.htm#Q47

#### Rotation and Quaternions:
https://gamedev.ru/code/articles/?id=4215

#### Perspective Images:
http://sci.sernam.ru/book_graph.php?id=19

#### Kinematics: direct and inverse problems:
http://robocraft.ru/blog/mechanics/756.html

#### Skeletal animation on the fingers:
https://gamedev.ru/code/articles/Skeletal_Animation
