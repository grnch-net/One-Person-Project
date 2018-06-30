console.info('%c DEV Version: 85 ', 'background: #232627; color: #bada55');

import { AVE } from "./ave/ave";
(window as any).AVE = AVE;

import { animatedCube } from './examples/animated-cube';
animatedCube();
