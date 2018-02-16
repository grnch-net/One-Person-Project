console.info('%c Version: 33 ', 'background: #232627; color: #bada55');

import { AVE } from "./ave/ave";

let scene = new AVE.SceneSVG({ width: 800, height: 600});

// let animationGroup = scene.animator.createGroup();
// scene.animator.timeout(()=>{
// 	animationGroup.add(1000, {
// 		onStart: ()=>{console.log('1')},
// 		onComplete: ()=>{console.log('2')}
// 	}).add(1000, {
// 		delay: 1000,
// 		onStart: ()=>{console.log('3')},
// 		onComplete: ()=>{console.log('4')}
// 	}).add(1000, {
// 		onStart: ()=>{console.log('5')},
// 		onComplete: ()=>{console.log('6')}
// 	});
// }, 1000);

let graphicGroup = new AVE.GraphicGroupSVG();
let objectPoint = new AVE.GraphicObject();
objectPoint.addPoint(10, 10, 0);

graphicGroup.addChild(objectPoint);
graphicGroup.rotation.set(0, -90, 0);

scene.world.addChild(graphicGroup);

console.log('objectPoint', objectPoint.children[0].globalPosition);
