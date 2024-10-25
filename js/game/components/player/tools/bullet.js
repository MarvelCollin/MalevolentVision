import { ctx, canvas } from '../../../ctx.js';
import { boxes } from '../../boxes/boxes.js';

export class Bullet {
  constructor(x, y, speed, direction) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.direction = direction;
    this.active = true;
    this.move = true;
    this.duration = 500;
  }

  move(){
    this.x += this.speed * Math.cos(this.direction);
    this.y += this.speed * Math.sin(this.direction);
  }

  update() {

    // console.log("x : " + this.x + " | y : " + this.y);
    

    if (
      this.x < 0 ||
      this.x > canvas.width ||
      this.y < 0 ||
      this.y > canvas.height ||
      this.willCollide(this.x, this.y)
    ) {
      this.active = false;
    }
  }

  draw() {
    ctx.fillStyle = "magenta";
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
    ctx.fill();
  }

  willCollide(newX, newY) {
    const nextPosition = {
      x: newX,
      y: newY
    };

    for (let box of boxes) {
      if (
        nextPosition.x < box.x + box.width &&
        nextPosition.x > box.x &&
        nextPosition.y < box.y + box.height &&
        nextPosition.y > box.y
      ) {
        // console.log("iajsdiasd");
        return true;
      }
    }

    return false;
  }
}
