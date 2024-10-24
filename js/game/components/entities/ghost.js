import { canvas, ctx } from "../../ctx.js";
import { boxes } from "../boxes/boxes.js";
import { Entities } from "./entity.js";

export class Ghost extends Entities {
  constructor(x, y, width, height, speed, color) {
    super(x, y, width, height, speed);
    this.color = color;
  }

  draw() {
    console.log("draw color : " + this.color);
    console.log("asdhayisdhasudh");
    ctx.fillStyle = this.color;
    console.log("draw color : " + this.color);
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  moveRandomly() {
    const randomDirection = Math.floor(Math.random() * 4);
    let newX = this.x;
    let newY = this.y;

    switch (randomDirection) {
      case 0:
        newX -= this.speed;
        break;
      case 1:
        newX += this.speed;
        break;
      case 2:
        newY -= this.speed;
        break;
      case 3:
        newY += this.speed;
        break;
    }

    if (!this.willCollide(newX, this.y)) {
      this.x = newX;
    }
    if (!this.willCollide(this.x, newY)) {
      this.y = newY;
    }
  }

  isPointInGhost(x, y) {
    if (
      x >= this.x &&
      x <= this.x + this.width &&
      y >= this.y &&
      y <= this.y + this.height
    ) {
    //   console.log("kena semprot");
      return true;
    }
    // console.log("gk kena bg");
    return false;
  }
}
