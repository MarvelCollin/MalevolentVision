import { Bullet } from "./tools/bullet.js";
import { Entities } from "../entities/entity.js";
import { ctx, canvas } from "../../ctx.js";

export class Player extends Entities {
  constructor(x, y, width, height, speed) {
    super(x, y, width, height, speed);
    this.bullets = [];
    this.angle = 0;

    window.addEventListener("mousedown", (event) => {
      if (event.button === 0) {
        this.shoot();
      }
    });

    window.addEventListener("mousemove", (event) => {
      this.updateAngle(event);
    });
  }

  updateAngle(event) {
    // console.log(event);
    const rect = canvas.getBoundingClientRect();
    const playerCenterX = canvas.width / 4;
    const playerCenterY = canvas.height / 4;
    const mouseX = event.clientX - playerCenterX;
    const mouseY = event.clientY - playerCenterY;
    this.angle = Math.atan2(mouseY, mouseX);
  }

  shoot() {
    const bullet = new Bullet(
      this.x + this.width / 2,
      this.y + this.height / 2,
      60,
      this.angle
    );
    this.bullets.push(bullet);
  }

  update() {
    this.bullets = this.bullets.filter((bullet) => bullet.active);
    this.bullets.forEach((bullet) => bullet.update());
  }

  draw() {
    super.draw();
    this.bullets.forEach((bullet) => bullet.draw());
  }
}
