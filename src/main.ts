console.info('%c Version: 8 ', 'background: #232627; color: #bada55');

import { SceneSVG } from "./ave/scene/scene-svg";

let scene = new SceneSVG({ width: 800, height: 600});
console.log(scene);


document.querySelector('#client-status').innerHTML = 'Done';
