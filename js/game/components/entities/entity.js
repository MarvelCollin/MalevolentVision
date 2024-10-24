import { ctx, canvas } from "../../ctx.js";
import { boxes } from "../boxes/boxes.js";

export class Entities {
  constructor(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
  }

  draw(color = "blue") {
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
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

  move(keys) {
    const newX = keys["a"]
      ? this.x - this.speed
      : keys["d"]
      ? this.x + this.speed
      : this.x;
    const newY = keys["w"]
      ? this.y - this.speed
      : keys["s"]
      ? this.y + this.speed
      : this.y;

    if (!this.willCollide(newX, this.y)) {
      this.x = newX;
    }
    if (!this.willCollide(this.x, newY)) {
      this.y = newY;
    }
    // console.log(this.speed);

    // console.log(`x: ${this.x}, y: ${this.y}`);
  }
}

export default Entities;
