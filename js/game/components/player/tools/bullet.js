import { ctx, canvas } from "../../../ctx.js";
import { boxes } from "../../boxes/boxes.js";

export class Bullet {
  constructor(x, y, speed, direction, width, height) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.direction = direction;
    this.width = 3;
    this.height = 3;
    this.active = true;
    this.move = true;
    this.duration = 500;
  }

  moving() {
    this.x += this.speed * Math.cos(this.direction);
    this.y += this.speed * Math.sin(this.direction);
  }

  update() {
    if (this.move) {
      this.moving();
    } else {
      setTimeout(() => {
        this.active = false;
      }, 5000);
    }

    if (
      this.x - this.width < 0 ||
      this.x + this.width > canvas.width ||
      this.y - this.height < 0 ||
      this.y + this.height > canvas.height ||
      this.willCollide(this.x, this.y)
    ) {
      this.move = false;
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
      y: newY,
      width: this.width,
      height: this.height,
    };

    for (let box of boxes) {
      if (
        nextPosition.x < box.x + box.width &&
        nextPosition.x + nextPosition.width > box.x &&
        nextPosition.y < box.y + box.height &&
        nextPosition.y + nextPosition.height > box.y
      ) {
        return true;
      }
    }

    return false;
  }
}
