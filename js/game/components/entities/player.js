import { Entities } from './entity.js';

// export let player = {
//   x: canvas.width / 2,
//   y: canvas.height / 2,
//   width: 50,
//   height: 50,
//   speed: 9,
// };

export class Player extends Entities {
    constructor(x, y, width, height, speed){
      super(x, y, width, height, speed);
    }
}
