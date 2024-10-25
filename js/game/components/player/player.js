import { Bullet } from "./tools/bullet.js";
import { Entities } from "../entities/entity.js";
import { ctx, canvas } from "../../ctx.js";

export class Player extends Entities {
  constructor(x, y, width, height, speed) {
    super(x, y, width, height, speed);
    this.bullets = [];
    this.angle = 0;
    this.health = 80;
    this.maxAmmo = 3;
    this.currentAmmo = this.maxAmmo;
    this.lastShotTime = 0;
    this.shootCooldown = 1000;
    this.dashSpeed = 20;
    this.dashDuration = 200;
    this.dashing = false;
    this.dashStartTime = 0;
    this.dashDirection = { x: 0, y: 0 };
    this.dashCooldown = 1000;
    this.lastDashTime = 0;
    this.dashShadowOpacity = 0.5;
    this.keySequence = {};
    this.doublePressThreshold = 250;

    window.addEventListener("mousedown", this.handleMouseDown.bind(this));
    window.addEventListener("mousemove", this.handleMouseMove.bind(this));
    window.addEventListener("keydown", this.handleKeyDown.bind(this));
    window.addEventListener("keyup", this.handleKeyUp.bind(this));
  }

  handleMouseDown(event) {
    if (event.button === 0) {
      this.shoot();
    }
  }

  handleMouseMove(event) {
    this.updateAngle(event);
  }

  handleKeyDown(event) {
    const key = event.key.toLowerCase();
    const currentTime = Date.now();

    if (["w", "a", "s", "d"].includes(key)) {
      if (!this.keySequence[key]) {
        this.keySequence[key] = { count: 0, lastKeyUpTime: 0 };
      }

      if (
        currentTime - this.keySequence[key].lastKeyUpTime <=
        this.doublePressThreshold
      ) {
        this.keySequence[key].count++;
      } else {
        this.keySequence[key].count = 1;
      }

      if (this.keySequence[key].count === 2) {
        this.dash(key);
        this.keySequence[key].count = 0;
      }
    }

    if (key === "r") {
      this.reload();
    }
  }

  handleKeyUp(event) {
    const key = event.key.toLowerCase();
    const currentTime = Date.now();

    if (["w", "a", "s", "d"].includes(key)) {
      if (this.keySequence[key]) {
        this.keySequence[key].lastKeyUpTime = currentTime;
      }
    }
  }

  updateAngle(event) {
    const rect = canvas.getBoundingClientRect();
    const playerCenterX = canvas.width / 4;
    const playerCenterY = canvas.height / 4;
    const mouseX = event.clientX - playerCenterX;
    const mouseY = event.clientY - playerCenterY;
    this.angle = Math.atan2(mouseY, mouseX);
  }

  shoot() {
    const currentTime = Date.now();
    if (
      currentTime - this.lastShotTime >= this.shootCooldown &&
      this.currentAmmo > 0
    ) {
      const bullet = new Bullet(
        this.x + this.width / 2,
        this.y + this.height / 2,
        60,
        this.angle,
        3,
        3
      );
      this.bullets.push(bullet);
      this.currentAmmo--;
      this.lastShotTime = currentTime;
    }
  }

  reload() {
    this.currentAmmo = this.maxAmmo;
  }

  dash(direction) {
    const currentTime = Date.now();
    if (currentTime - this.lastDashTime >= this.dashCooldown) {
      this.dashing = true;
      this.dashStartTime = currentTime;
      this.lastDashTime = currentTime;

      switch (direction) {
        case "w":
          this.dashDirection = { x: 0, y: -1 };
          break;
        case "a":
          this.dashDirection = { x: -1, y: 0 };
          break;
        case "s":
          this.dashDirection = { x: 0, y: 1 };
          break;
        case "d":
          this.dashDirection = { x: 1, y: 0 };
          break;
      }
    }
  }

  update() {
    const currentTime = Date.now();
    if (this.dashing) {
      if (currentTime - this.dashStartTime <= this.dashDuration) {
        this.x += this.dashDirection.x * this.dashSpeed;
        this.y += this.dashDirection.y * this.dashSpeed;
        this.drawDashShadow();
      } else {
        this.dashing = false;
      }
    }

    this.bullets = this.bullets.filter((bullet) => bullet.active);
    this.bullets.forEach((bullet) => bullet.update());
  }

  drawDashShadow() {
    ctx.save();
    ctx.globalAlpha = this.dashShadowOpacity;
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.restore();
  }

  draw() {
    super.draw();
    this.bullets.forEach((bullet) => bullet.draw());
  }
}