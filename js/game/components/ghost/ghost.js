import { canvas, ctx } from "../../ctx.js";
import { boxes } from "../boxes/boxes.js";
import { Entities } from "../entities/entity.js";
import { ASSETS } from "../loader/assets.js";

export class Ghost extends Entities {
  constructor(x, y, width, height, speed, color) {
    super(x, y, width, height, speed);
    this.color = color;
    this.canPassThrough = false;
    this.active = false;
    this.chasingTarget = false;

    this.setRandomPassThrough = this.setRandomPassThrough.bind(this);
    this.setRandomBehavior = this.setRandomBehavior.bind(this);

    this.image = new Image();
    this.image.src = ASSETS.ENEMY.DEAD.POSITION1[1];
    this.width = this.image.width * 3;
    this.height = this.image.height * 3;

    this.setRandomPassThrough();
    this.setRandomBehavior();
  }

  getColor() {
    return this.color;
  }

  setColor(color) {
    this.color = color;
  }

  getCanPassThrough() {
    return this.canPassThrough;
  }

  setCanPassThrough(canPassThrough) {
    this.canPassThrough = canPassThrough;
  }

  getActive() {
    return this.active;
  }

  setActive(active) {
    this.active = active;
  }

  getChasingTarget() {
    return this.chasingTarget;
  }

  setChasingTarget(chashingTarget) {
    this.chasingTarget = chasingTarget;
  }

  setRandomPassThrough = () => {
    const randomTime = Math.random() * 5000 + 1000;
    setTimeout(() => {
      this.enablePassThrough();
      this.setRandomPassThrough();
    }, randomTime);
  };

  enablePassThrough = () => {
    this.canPassThrough = true;
    const randomDuration = Math.random() * 2000 + 500;
    setTimeout(() => {
      this.canPassThrough = false;
    }, randomDuration);
  };

  setRandomBehavior = () => {
    const randomTime = Math.random() * 5000 + 1000;
    setTimeout(() => {
      const behavior = Math.floor(Math.random() * 2);
      if (behavior === 0) {
        this.chasingTarget = false;
      } else if (behavior === 1) {
        this.chasingTarget = true;
      }
      this.setRandomBehavior();
    }, randomTime);
  };

  draw() {
    if (this.active) {
      ctx.fillStyle = "black";
      ctx.fillRect(this.x, this.y, this.width, this.height);
    } else {
      if (this.image.complete) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      } else {
        this.image.onload = () => {
          ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        };
      }
    }
  }

  moveToTarget(targetX, targetY) {
    if (this.active) return;

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

  disableForSeconds(seconds) {
    this.active = true;
    console.log("diem");
    this.color = "magenta";
    setTimeout(() => {
      this.active = false;
    }, seconds * 1000);
  }

  isHit(bullet) {
    return (
      bullet.x >= this.x &&
      bullet.x <= this.x + this.width &&
      bullet.y >= this.y &&
      bullet.y <= this.y + this.height
    );
  }

  isCollidingWithPlayer(player) {
    return (
      player.x < this.x + this.width &&
      player.x + player.width > this.x &&
      player.y < this.y + this.height &&
      player.y + player.height > this.y
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

  update(playerX, playerY) {
    if (this.chasingTarget) {
      this.moveToTarget(playerX, playerY);
    }
  }
}
