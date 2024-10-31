import { Bullet } from "./tools/bullet.js";
import { Entities } from "../entities/entity.js";
import { ctx, canvas } from "../../ctx.js";
import { playerSetting } from "../../setting.js";
import { PlayerMovement } from "./utils/playerMovement.js";
import { PlayerShooting } from "./utils/playerShooting.js";
import { drawTerrainChunks } from "../loader/map.js";
import { getMidPosition } from "../helper/calculator.js";

export class Player extends Entities {
  constructor(x, y, width, height, speed) {
    super(x, y, width, height, speed);
    this.angle = 0;
    this.health = 100;
    this.scaleX = 3;
    this.scaleY = 3;

    this.playerMovement = new PlayerMovement(this);
    this.playerShooting = new PlayerShooting(this);

    this.sprites = [];
    this.currentFrame = 0;
    this.frameTime = 100;
    this.lastFrameTime = Date.now();

    window.addEventListener(
      "keydown",
      this.getPlayerMovement().handleKeyDown.bind(this.playerMovement)
    );
    window.addEventListener(
      "keyup",
      this.getPlayerMovement().handleKeyUp.bind(this.playerMovement)
    );
    window.addEventListener("mousedown", this.getPlayerShooting().handleMouseDown.bind(this.playerShooting));
    window.addEventListener("mousemove", this.getPlayerShooting().handleMouseMove.bind(this.playerShooting));
    

    this.loadSprites();
  }

  setAngle(angle){
    this.angle = angle;
  }

  getAngle(){
    return this.angle;
  }

  getPlayerMovement() {
    return this.playerMovement;
  }

  getPlayerShooting(){
    return this.playerShooting;
  }


  loadSprites() {
    for (let i = 1; i <= 8; i++) {
      const img = new Image();
      img.src = `../../../../assets/player/walk/left/player_gun_walk_${i}.png`;
      this.sprites.push(img);
    }
  }

  update(ghost) {
    if (
      this.willCollide(
        this.x + this.getPlayerMovement().dashDirection.x * 15,
        this.y + this.getPlayerMovement().dashDirection.y * 15
      )
    ) {
      this.getPlayerMovement().dashing = false;
    }

    this.getPlayerShooting().updateGun(ghost);

    if (ghost.isCollidingWithPlayer(this)) {
      this.health -= 10;
      // console.log("Player health:", this.health);
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
    this.getPlayerShooting().drawEachBullet();

    this.updateFrame();
    ctx.drawImage(
      this.sprites[this.currentFrame],
      getMidPosition(this.x, this.width / 2* 3),
      getMidPosition(this.y, this.height / 2* 3),
      this.width * 3,
      this.height * 3 
    );

    this.getPlayerShooting().drawGun();
  }
}
