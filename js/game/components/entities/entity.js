import { ctx, canvas } from "../../ctx.js";
import { boxes } from "../boxes/boxes.js";
import { DIRECTION, STATUS } from "../../setting.js";

export class Entities {
  constructor(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.direction = DIRECTION.DOWN;
    this.status = STATUS.IDLE;
  }

  setDirection(direction) {
    this.direction = direction;
  }

  getDirection() {
    return this.direction;
  }

  setStatus(status) {
    this.status = status;
  }

  getStatus() {
    return this.status;
  }

  getEntityX() {
    return this.x;
  }

  getEntityY() {
    return this.y;
  }

  getEntityWidth() {
    return this.width;
  }

  getEntityHeight() {
    return this.height;
  }

  getEntitySpeed() {
    return this.speed;
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
        // console.log("iajsdiasd");
        return true;
      }
    }

    return false;
  }

  move(keys) {
    // console.log("tidal tembus")
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

    if(keys["a"]){
      this.direction = DIRECTION.LEFT;
    } else if(keys["d"]){
      this.direction = DIRECTION.RIGHT;
    } else if(keys["s"]){
      this.direction = DIRECTION.DOWN;
    } else if(keys["w"]){
      this.direction = DIRECTION.UP;
    }

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
