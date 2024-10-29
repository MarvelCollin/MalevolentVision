import { PlayerMovement } from "./utils/playerMovement.js";
import { PlayerShooting } from "./utils/playerShooting.js";
import { PlayerAssets } from "./utils/playerAssets.js";
import { PlayerRendering } from "./utils/playerRendering.js";
import { canvas, ctx } from "../../ctx.js";

export class Player {
  constructor(x, y, width, height, speed) {
    this.movement = new PlayerMovement(this, speed);
    this.shooting = new PlayerShooting(this);
    this.assets = new PlayerAssets(this);
    this.rendering = new PlayerRendering(this);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.angle = 0;
    this.health = 100;

    window.addEventListener(
      "mousedown",
      this.shooting.handleMouseDown.bind(this.shooting)
    );
    window.addEventListener("mousemove", this.updateAngle.bind(this));
    window.addEventListener(
      "keydown",
      this.movement.handleKeyDown.bind(this.movement)
    );
    window.addEventListener(
      "keyup",
      this.movement.handleKeyUp.bind(this.movement)
    );
  }

  updateAngle(event) {
    const rect = canvas.getBoundingClientRect();
    const playerCenterX = this.x + this.width / 2;
    const playerCenterY = this.y + this.height / 2;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    this.angle = Math.atan2(mouseY - playerCenterY, mouseX - playerCenterX);
  }

  update(ghost) {
    this.movement.updatePosition();
    this.shooting.updateBullets(ghost);
  }

  draw() {
    this.rendering.drawPlayer();
  }
}
