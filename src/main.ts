console.info('%c Version: 22 ', 'background: #232627; color: #bada55');

import { SceneSVG } from "./ave/scene/scene-svg";
import { Animator } from "./ave/animator/animator";

let scene = new SceneSVG({ width: 800, height: 600});
let group = scene.animator.createGroup();
scene.animator.timeout(()=>{
	group.add(1000, {
		onStart: ()=>{console.log('1')},
		onComplete: ()=>{console.log('2')}
	}).add(1000, {
		delay: 1000,
		onStart: ()=>{console.log('3')},
		onComplete: ()=>{console.log('4')}
	}).add(1000, {
		onStart: ()=>{console.log('5')},
		onComplete: ()=>{console.log('6')}
	});

}, 1000);
