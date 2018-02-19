console.info('%c Version: 47 ', 'background: #232627; color: #bada55');

import { AVE } from "./ave/ave";
import { Quaternion } from "./ave/graphic/quaternion";

(window as any).AVE = AVE;

let scene = new AVE.SceneSVG({ width: 800, height: 600});
(window as any).scene = scene;

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


let objectPoint = new AVE.GraphicObject();
objectPoint.name = 'point';
objectPoint.addPoint(10, 10, 0);

let graphicGroup = new AVE.GraphicGroup();
graphicGroup.name = 'group';
graphicGroup.scale.set(2, 1, 1);
graphicGroup.addChild(objectPoint);

scene.world.addChild(graphicGroup);
graphicGroup.rotation.set(90, 90, 90);
let p0 = objectPoint.children[0].globalPosition;
console.log('objectPoint', p0);


// public element: HTMLElement = easyHTML.createElement({ type: 'g', });


var p = { x: 20, y: 10, z: 0 };
var q = new Quaternion();
var q1 = new Quaternion(0, 0, 1, 90);
var q2 = new Quaternion(0, 1, 0, 90);
var q3 = new Quaternion(1, 0, 0, 90);

q.multiply(q1);
q.multiply(q2);
q.multiply(q3);
console.log(q.transform(p));
// console.log(q1.transformVector(p));
// console.log(q2.transformVector(p));
// console.log(q3.transformVector(p));
