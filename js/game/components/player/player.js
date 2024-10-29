import { Bullet } from "./tools/bullet.js";
import { Entities } from "../entities/entity.js";
import { ctx, canvas } from "../../ctx.js";
import { playerSetting } from "../../setting.js";

export class Player extends Entities {
  constructor(x, y, width, height, speed) {
    super(x, y, width, height, speed);
    this.bullets = [];
    this.angle = 0;
    this.health = 100;
    this.maxAmmo = playerSetting.maxAmmo;
    this.currentAmmo = this.maxAmmo;
    this.lastShotTime = 0;
    this.shootCooldown = playerSetting.shootCooldown;
    this.dashSpeed = playerSetting.dashSpeed;
    this.dashDuration = playerSetting.dashDuration;
    this.dashing = false;
    this.dashStartTime = 0;
    this.dashDirection = { x: 0, y: 0 };
    this.dashCooldown = playerSetting.dashCooldown;
    this.lastDashTime = 0;
    this.dashShadowOpacity = 0.5;
    this.keySequence = {};
    this.doublePressThreshold = 250;

    this.sprites = [];
    this.currentFrame = 0;
    this.frameTime = 100; // Time per frame in milliseconds
    this.lastFrameTime = Date.now();

    this.gunImage = new Image();
    this.gunImage.src = "../../../../assets/gun/gun.png";

    this.loadSprites();

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

  drawGun() {
    ctx.save();
    const playerCenterX = this.x + this.width / 2;
    const playerCenterY = this.y + this.height / 2;

    ctx.translate(playerCenterX, playerCenterY);
    ctx.rotate(this.angle);
    ctx.drawImage(
      this.gunImage,
      -this.gunImage.width / 2,
      -this.gunImage.height / 2,
      this.gunImage.width * 3,
      this.gunImage.height * 3
    );
    ctx.restore();
  }

  updateAngle(event) {
    const rect = canvas.getBoundingClientRect();
    const playerCenterX = canvas.width / 2;
    const playerCenterY = canvas.height / 2;
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

  loadSprites() {
    for (let i = 1; i <= 8; i++) {
      const img = new Image();
      img.src = `../../../../assets/player/walk/left/player_gun_walk_${i}.png`;
      this.sprites.push(img);
    }
  }

  updateFrame() {
    const currentTime = Date.now();
    if (currentTime - this.lastFrameTime >= this.frameTime) {
      this.currentFrame = (this.currentFrame + 1) % this.sprites.length;
      this.lastFrameTime = currentTime;
    }
  }

  update(ghost) {
    if (
      this.willCollide(
        this.x + this.dashDirection.x * 15,
        this.y + this.dashDirection.y * 15
      )
    ) {
      console.log("gabisa king");
      this.dashing = false;
    }

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
    this.bullets.forEach((bullet) => {
      bullet.update();
      if (ghost.isHit(bullet)) {
        ghost.disableForSeconds(3);
        bullet.active = false;
      }
    });

    if (ghost.isCollidingWithPlayer(this)) {
      this.health -= 10;
      // console.log("Player health:", this.health);
    }
  }

  drawDashShadow() {
    ctx.save();
    ctx.globalAlpha = this.dashShadowOpacity;
    ctx.fillStyle = "black";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.restore();
  }

  draw() {
    // super.draw();
    this.bullets.forEach((bullet) => bullet.draw());

    // Draw the player sprite animation
    this.updateFrame();
    ctx.drawImage(
      this.sprites[this.currentFrame],
      this.x - (this.width * 3) / 2,
      this.y - (this.height * 3) / 2,
      this.width * 3,
      this.height * 3
    );

    this.drawGun();
  }
}
