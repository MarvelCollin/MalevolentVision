import { ctx, canvas } from "../../../ctx.js";
import { isPointInBox } from "../../boxes/boxes.js";
import { player } from "../../../game.js";
import { ghost } from "../../../game.js";
import { flashlightSetting } from "../../../setting.js";
import { COMPONENT_SCALE,getNearbyComponents } from "../../loader/map.js";

export class Flashlight {
  constructor() {
    this.angle = flashlightSetting.angle;
    this.radius = flashlightSetting.radius;
    this.rotation = 0;
    this.isOn = flashlightSetting.isOn;
    this.steps = flashlightSetting.steps; 

    window.addEventListener("keydown", this.handleKeyPress.bind(this));
  }

  handleKeyPress(event) {
    if (event.key.toLowerCase() === "f") {
      this.toggle();
    }
  }

  toggle() {
    this.isOn = !this.isOn;
  }

  updateRotation(keys) {
    if (keys?.ArrowLeft) {
      this.rotation -= 0.05;
    } else if (keys?.ArrowRight) {
      this.rotation += 0.05;
    }
  }

  draw(keys) {
    if (!this.isOn) return;

    this.updateRotation(keys);
    const centerX = player.x + player.width / 4;
    const centerY = player.y + player.height / 2;
    let ghostHit = false;

    const nearbyComponents = getNearbyComponents(player, this.radius);

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);

    const angleStep = (this.angle * 2) / this.steps;
    const cosSinCache = [];

    for (let i = 0; i < this.steps; i++) {
        const angle = this.rotation + (-this.angle + angleStep * i);

        if (!cosSinCache[i]) {
            cosSinCache[i] = { cos: Math.cos(angle), sin: Math.sin(angle) };
        }

        const { cos, sin } = cosSinCache[i];
        let x = centerX;
        let y = centerY;

        for (let r = 0; r < this.radius; r += 1) { 
            const nextX = centerX + r * cos;
            const nextY = centerY + r * sin;

            if (ghost.isPointInGhost(nextX, nextY)) {
                ghostHit = true;
                ghost.color = "green";
            }

            const hitComponent = nearbyComponents.some(component => (
                nextX >= component.x &&
                nextX <= component.x + component.asset.naturalWidth * COMPONENT_SCALE &&
                nextY >= component.y &&
                nextY <= component.y + component.asset.naturalHeight * COMPONENT_SCALE
            ));

            if (hitComponent || isPointInBox(nextX, nextY)) {
                x = nextX;
                y = nextY;
                break;
            }

            x = nextX;
            y = nextY;
        }

        ctx.lineTo(x, y);
    }

    ghost.color = ghostHit ? "green" : "red";

    ctx.lineTo(centerX, centerY);
    ctx.closePath();

    ctx.fillStyle = "rgba(182, 189, 12, 0.5)";
    ctx.fill();

    ctx.globalCompositeOperation = "destination-over";
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "source-over";
}


  updateFlashlightRotation(e) {
    const playerCenterX = canvas.width / 2;
    const playerCenterY = canvas.height / 2;
    const dx = e.x - playerCenterX;
    const dy = e.y - playerCenterY;
    flashlight.rotation = Math.atan2(dy, dx);
  }
}

export const flashlight = new Flashlight();
