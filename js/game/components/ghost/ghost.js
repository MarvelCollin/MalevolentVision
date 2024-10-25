import { canvas, ctx } from "../../ctx.js";
import { boxes } from "../boxes/boxes.js";
import { Entities } from "../entities/entity.js";

export class Ghost extends Entities {
  constructor(x, y, width, height, speed, color) {
    super(x, y, width, height, speed);
    this.color = color;
    this.canPassThrough = false;
    this.setRandomPassThrough();
    this.setRandomBehavior();
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  moveToTarget(targetX, targetY) {
    let newX = this.x;
    let newY = this.y;

    if (this.x < targetX) {
      newX += this.speed;
    } else if (this.x > targetX) {
      newX -= this.speed;
    }

    if (this.y < targetY) {
      newY += this.speed;
    } else if (this.y > targetY) {
      newY -= this.speed;
    }

    const collideX = !this.canPassThrough && this.willCollide(newX, this.y);
    const collideY = !this.canPassThrough && this.willCollide(this.x, newY);

    if (collideX && collideY) {
      if (!collideX) {
        this.x = newX;
      } else if (!collideY) {
        this.y = newY;
      }
    } else {
      if (!collideX) {
        this.x = newX;
      }
      if (!collideY) {
        this.y = newY;
      }
    }
  }

  moveRandomly() {
    const directions = [
      { x: this.speed, y: 0 },
      { x: -this.speed, y: 0 },
      { x: 0, y: this.speed },
      { x: 0, y: -this.speed },
    ];
    const randomDirection =
      directions[Math.floor(Math.random() * directions.length)];
    const newX = this.x + randomDirection.x;
    const newY = this.y + randomDirection.y;

    if (!this.willCollide(newX, this.y)) {
      this.x = newX;
    }
    if (!this.willCollide(this.x, newY)) {
      this.y = newY;
    }
  }

  setRandomPassThrough() {
    const randomTime = Math.random() * 5000 + 1000;
    setTimeout(() => {
      this.enablePassThrough();
      this.setRandomPassThrough();
    }, randomTime);
  }

  enablePassThrough() {
    this.canPassThrough = true;
    const randomDuration = Math.random() * 2000 + 500;
    setTimeout(() => {
      this.canPassThrough = false;
    }, randomDuration);
  }

  setRandomBehavior() {
    const randomTime = Math.random() * 5000 + 1000;
    setTimeout(() => {
      const behavior = Math.floor(Math.random() * 2);
      console.log(behavior)
      if (behavior === 0) {
        this.chasingTarget = false;
      } else if (behavior === 1) {
        this.chasingTarget = true;
      }
      this.setRandomBehavior();
    }, randomTime);
  }

  update(playerX, playerY) {
    if (this.chasingTarget) {
      this.moveToTarget(playerX, playerY);
    }
  }

  willCollide(newX, newY) {
    return boxes.some(
      (box) =>
        newX < box.x + box.width &&
        newX + this.width > box.x &&
        newY < box.y + box.height &&
        newY + this.height > box.y
    );
  }

  isPointInGhost(x, y) {
    return (
      x >= this.x &&
      x <= this.x + this.width &&
      y >= this.y &&
      y <= this.y + this.height
    );
  }
}
