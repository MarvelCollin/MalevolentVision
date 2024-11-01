import { Bullet } from "./tools/bullet.js";
import { Entities } from "../entities/entity.js";
import { ctx, canvas } from "../../ctx.js";
import { playerSetting, DIRECTION, STATUS } from "../../setting.js";
import { PlayerMovement } from "./utils/playerMovement.js";
import { PlayerShooting } from "./utils/playerShooting.js";
import { drawTerrainChunks } from "../loader/map.js";
import { getMidPosition } from "../helper/calculator.js";
import { fetchAssets } from "../helper/renderer.js";
import { ASSETS } from "../loader/assets.js";

export class Player extends Entities {
  constructor(x, y, width, height, speed) {
    super(x, y, width, height, speed);
    this.angle = 0;
    this.health = 100;
    this.scaleX = 3;
    this.scaleY = 3;
    this.playerMovement = new PlayerMovement(this);
    this.playerShooting = new PlayerShooting(this);

    this.source = ASSETS.PLAYER.IDLE.LEFT;
    this.sprites = [];
    this.currentFrame = 0;
    this.frameTime = 100;
    this.lastFrameTime = Date.now();
    
    this.initializeEventListeners();
    this.loadSprites();
  }

  getSource() {
    return this.source;
  }

  setSource(source) {
    this.source = source;
  }

  setAngle(angle) {
    this.angle = angle;
  }

  getAngle() {
    return this.angle;
  }

  getPlayerMovement() {
    return this.playerMovement;
  }

  getPlayerShooting() {
    return this.playerShooting;
  }

  initializeEventListeners() {
    window.addEventListener("keydown", (e) => this.playerMovement.handleKeyDown(e));
    window.addEventListener("keyup", (e) => this.playerMovement.handleKeyUp(e));
    window.addEventListener("mousedown", (e) => this.playerShooting.handleMouseDown(e));
    window.addEventListener("mousemove", (e) => this.playerShooting.handleMouseMove(e));
  }

  loadSprites() {
    for(let i = 0; i < this.source.length; i++){
      const img = new Image();
      img.src = this.source[i];
      this.sprites[i] = img;
    }
  }

  update(ghost) {
    const { dashDirection, dashing } = this.playerMovement;
    const newPosX = this.x + dashDirection.x * 15;
    const newPosY = this.y + dashDirection.y * 15;

    if (this.willCollide(newPosX, newPosY)) {
      this.playerMovement.dashing = false;
    }

    this.playerShooting.updateGun(ghost);

    if (ghost.isCollidingWithPlayer(this)) {
      this.health -= 10;
    }
  }

  updateFrame() {
    const currentTime = Date.now();
    if (currentTime - this.lastFrameTime >= this.frameTime) {
      this.currentFrame = (this.currentFrame + 1) % this.sprites.length;
      this.lastFrameTime = currentTime;
    }
  }

  draw() {
    this.playerShooting.drawEachBullet();
    this.updateFrame();
    this.updateStatus();
    ctx.drawImage(
      this.sprites[this.currentFrame],
      getMidPosition(this.x, this.width * 1.5),
      getMidPosition(this.y, this.height * 1.5),
      this.width * 2,
      this.height * 2
    );

    this.playerShooting.drawGun();
  }

  updateStatus() {
    const directionAssets = ASSETS.PLAYER[this.status];
    if (directionAssets?.[this.direction]) {
      this.setSource(directionAssets[this.direction]);
    }
    this.loadSprites();
  }
}
