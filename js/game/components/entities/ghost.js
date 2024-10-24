import { canvas, ctx } from "../../ctx.js";
import { boxes } from "../boxes/boxes.js";
import { Entities } from "./entity.js";

export class Ghost extends Entities {
  constructor(x, y) {
    super(x, y, 50, 50);
  }

  draw() {
    super.draw("red");
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
}